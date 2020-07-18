import { Drash } from "./deps.ts";
import HomeResource from "./resources/home_resource.ts";
import CreateResource from "./resources/create_resource.ts";
import PostResource from "./resources/post_resource.ts";
import ResourcesResource from "./resources/resources_resource.ts";
import AboutResource from "./resources/about_resource.ts";
import LoginResource from "./resources/login_resource.ts";

const server = new Drash.Http.Server({
  directory: Deno.realPathSync("./"),
  response_output: "text/html",
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: false,
    level: "debug",
  }),
  resources: [
    HomeResource,
    CreateResource,
    ResourcesResource,
    AboutResource,
    LoginResource,
    PostResource
  ],
  static_paths: ["/public"],
  template_engine: true,
  views_path: "./public/views",
});

await server.run({
  hostname: "localhost",
  port: 1667,
});

console.log(`Server listening: http://${server.hostname}:${server.port}`);
