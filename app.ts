import { Drash } from "./deps.ts";
import HomeResource from "./resources/home_resource.ts";
import NewResource from "./resources/new_resource.ts";
import PostResource from "./resources/post_resource.ts";
import ResourcesResource from "./resources/resources_resource.ts";
import AboutResource from "./resources/about_resource.ts";
import LoginResource from "./resources/login_resource.ts";
import UploadResource from "./resources/image_upload_resource.ts";
import EditResource from "./resources/edit_resource.ts";

const server = new Drash.Http.Server({
  directory: Deno.realPathSync("./"),
  response_output: "text/html",
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: true,
    level: "debug",
  }),
  resources: [
    HomeResource,
    NewResource,
    ResourcesResource,
    AboutResource,
    LoginResource,
    PostResource,
    UploadResource,
    EditResource,
  ],
  static_paths: ["/public", "/robots.txt"],
  template_engine: true,
  views_path: "./public/views",
});

await server.run({
  hostname: "localhost",
  port: 1667,
});

console.log(`Server listening: http://${server.hostname}:${server.port}`);
