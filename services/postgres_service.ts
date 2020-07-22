import { load } from "https://deno.land/x/tiny_env/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.4.2/mod.ts";
import { QueryResult } from "https://deno.land/x/postgres@v0.4.2/query.ts";

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
    await client.connect();
    const queryResult = await client.query(
      `SELECT * FROM ${table} ORDER BY ${sortBy} DESC;`,
    );
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
    await client.end();
    return returnedResult;
  }

  async getOne(table, column, param) {
    await client.connect();
    const queryResult = await client.query(
      `SELECT * FROM ${table} WHERE ${column} = '${param}'`,
    );
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
    await client.end();
    return returnedResult;
  }

  async create(dbQuery) {
    await client.connect();
    const result: QueryResult = await client.query(dbQuery);
    if (result.rowCount > 0) {
      // console.log("slug: ", result.rows[0][0]);
      await client.end();
      return ({ ok: true, slug: result.rows[0][0] });
    } else {
      await client.end();
      console.log(`Oops! Didn't work for some reason: `, result);
      return ({ ok: false });
    }
  }
  async delete(id) {
    await client.connect();
    const result: QueryResult = await client.query(
      "DELETE FROM posts WHERE id = $1;",
      id,
    );
    if (result.rowCount > 0) {
      await client.end();
      return { ok: true };
    } else {
      await client.end();
      return { ok: false };
    }
  }
  async update(data) {
    const post = { ...data.post };
    await client.connect();
    try {
      const result: QueryResult = await client.query(
        "UPDATE posts SET title = $1, subtitle = $2, excerpt = $3, content = $4, featured_image = $5 WHERE id = $6 RETURNING *;",
        post.title,
        post.subtitle,
        post.excerpt,
        post.content,
        post.featured_image,
        post.id,
      );
      console.log(result);
      if (result.rowCount > 0) {
        await client.end();
        return { ok: true };
      } else {
        await client.end();
        return { ok: false };
      }
    } catch (error) {
      console.error(error);
    }
  }
}
