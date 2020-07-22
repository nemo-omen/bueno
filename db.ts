import { connect } from "https://deno.land/x/cotton/mod.ts";
import { load } from "https://deno.land/x/tiny_env/mod.ts";

// load .env variables
load();

// init db connection
export const db = await connect({
  type: "postgres",
  port: parseInt(Deno.env.get("DB_PORT")),
  database: "bueno_blog",
  hostname: Deno.env.get("DB_HOST"),
  username: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
});
