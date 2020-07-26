import { load } from "../deps.ts";
import { Client } from "../deps.ts";
import { QueryResult } from "../deps.ts";
import { Post } from "../models/post.ts";

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
    try {
      const queryResult = await client.query(
        `SELECT * FROM ${table} ORDER BY ${sortBy} DESC;`,
      );
      const returnedResult = this.objectify(queryResult);
      return returnedResult;
    } catch (error) {
      console.error(error);
      return { ok: false, error: error };
    }
  }

  async getOne(table, column, param) {
    await client.connect();
    try {
      const queryResult = await client.query(
        `SELECT * FROM ${table} WHERE ${column} = '${param}'`,
      );
      const returnedResult = this.objectify(queryResult);
      // console.log("Get one result: ", returnedResult);
      await client.end();
      return { ok: true, result: returnedResult };
    } catch (error) {
      console.error(error);
      return { ok: false, error: error };
    }
  }

  async create(post: Post) {
    await client.connect();
    try {
      const queryResult: QueryResult = await client.query(
        `INSERT INTO posts (id, slug, publish_date_string, title, subtitle, excerpt, content, featured_image, created_at, updated_at)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
        post.id,
        post.slug,
        post.publish_date_string,
        post.title,
        post.subtitle,
        post.excerpt,
        post.content,
        post.featured_image,
        post.created_at,
        post.updated_at,
      );
      if (queryResult.rowCount > 0) {
        const returnedResult = this.objectify(queryResult);
        await client.end();
        return ({ ok: true, result: returnedResult });
      } else {
        await client.end();
        console.log(`Oops! Didn't work for some reason: `, queryResult);
        return ({ ok: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async update(post: Post) {
    // const post = { ...data.post };
    console.log(post);
    await client.connect();
    try {
      const queryResult: QueryResult = await client.query(
        `UPDATE posts
        SET title = $1,
        subtitle = $2,
        excerpt = $3,
        content = $4,
        featured_image = $5,
        updated_at = $6
        WHERE id = $7 RETURNING *;`,
        post.title,
        post.subtitle,
        post.excerpt,
        post.content,
        post.featured_image,
        post.updated_at,
        post.id,
      );
      console.log("queryResult", queryResult);
      const returnedResult = this.objectify(queryResult);
      console.log("Returned result: ", returnedResult);
      if (queryResult.rowCount > 0) {
        await client.end();
        return { ok: true, result: returnedResult };
      } else {
        await client.end();
        return { ok: false, result: returnedResult };
      }
    } catch (error) {
      console.error(error);
      return { ok: false, error: error };
    }
  }

  async delete(id) {
    await client.connect();
    try {
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
    } catch (error) {
      console.error(error);
    }
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
