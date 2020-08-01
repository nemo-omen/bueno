import { load } from "../deps.ts";
import { Client } from "../deps.ts";
import { QueryResult } from "../deps.ts";
import { Post } from "../models/post.ts";
import { Logger } from "./logger_service.ts";

const logger = new Logger();

load();

// define db client
const client = new Client({
  hostname: Deno.env.get("DB_HOST"),
  user: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
  port: parseInt(Deno.env.get("DB_PORT")),
  database: "bueno_blog",
});

export class PgService {
  async getAllSorted(table, sortBy) {
    try {
      const response = await this.executeQuery(
        `SELECT * FROM ${table} ORDER BY ${sortBy} DESC;`,
      );
      if (response.ok) {
        return response.result;
      }
    } catch (error) {
      logger.error(error);
      return { ok: false, error: error };
    }
  }

  async getOne(table, column, param) {
    await client.connect();
    try {
      const response = await this.executeQuery(
        `SELECT * FROM ${table} WHERE ${column} = '${param}'`,
      );
      return response;
    } catch (error) {
      logger.error(error);
      return { ok: false, error: error };
    }
  }

  async create(post: Post) {
    const myQuery = this.buildQuery("posts", "INSERT", post);
    logger.info("Create post: ", post);
    logger.info("Query", myQuery);
    try {
      const response = await this.executeQuery(myQuery);
      console.info("Create Query Response", response);
      return response;
    } catch (error) {
      logger.error(error);
      return { ok: false, error: error };
    }
  }

  async update(post: Post) {
    const myQuery = this.buildQuery("posts", "UPDATE", post, post.id);
    console.log(myQuery);
    try {
      const response = await this.executeQuery(myQuery);
      logger.info("Update Query Response", response);
      return response;
    } catch (error) {
      logger.error(error);
      return { ok: false, error: error };
    }
  }

  async delete(id) {
    await client.connect();
    try {
      const response = await this.executeQuery(
        `DELETE FROM posts WHERE id = '${id}' RETURNING *;`,
      );
      logger.info("Delete Query Response", response);
      return response;
    } catch (error) {
      logger.error(error);
      return { ok: false, error: error };
    }
  }

  async executeQuery(query: any, options: any = null) {
    await client.connect();
    try {
      const result: QueryResult = !options
        ? await client.query(query)
        : await client.query(query, options);
      const returnedResult = this.objectify(result);
      logger.info("Executed Query", returnedResult);
      if (result.rowCount > 0) {
        await client.end();
        logger.success("Query success", returnedResult);
        return { ok: true, result: returnedResult };
      } else {
        await client.end();
        logger.error(returnedResult);
        return { ok: false, result: returnedResult };
      }
    } catch (error) {
      logger.error(error);
      return { ok: false, error: error };
    }
  }

  buildQuery(
    table: string,
    queryType: string,
    queryProps: object,
    id: string = "",
  ) {
    const keys = Object.keys(queryProps);
    const values = Object.values(queryProps);
    const entries = Object.entries(queryProps);
    let queryPhrase = "";

    const keySet = keys.map((key) => {
      return ` ${key}`;
    });

    const valueSet = values.map((value) =>
      typeof (value) === "string" ? ` $$${value}$$` : ` ${value}`
    ).toString();

    const entriesMap = entries.map((entry) => {
      return typeof entry[1] === "string"
        ? `${entry[0]} = $$${entry[1]}$$`
        : `${entry[0]} = ${entry[1]}`;
    });

    switch (queryType) {
      case "INSERT":
        queryPhrase =
          `INSERT INTO ${table} (${keySet.toString()}) VALUES (${valueSet}) RETURNING *;`;
        break;
      case "UPDATE":
        queryPhrase =
          `UPDATE ${table} SET ${entriesMap.toString()} WHERE id = '${id}' RETURNING *;`;
        break;
    }
    return queryPhrase;
  }

  objectify(queryResult: QueryResult) {
    let returnedResult = [];
    const columns = queryResult.rowDescription.columns;
    const columnNames: string[] = columns.map((column) => {
      return column.name;
    });
    const rows = queryResult.rows;
    rows.forEach((row, rowIndex) => {
      let rowData: any = {};
      row.forEach((rowVal, rIndex) => {
        const columnName: string = columnNames[rIndex];
        rowData[columnName] = row[rIndex];
      });
      returnedResult.push({ ...rowData });
    });
    return returnedResult;
  }
}
