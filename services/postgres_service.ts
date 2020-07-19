import { DataTypes, Database, Model } from "https://deno.land/x/denodb/mod.ts";

const db = new Database("postgres", {
  host: "192.168.0.11:5432",
  username: "bueno",
  password: "Aliens1986!",
  database: "posts",
});
