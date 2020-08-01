import { Drash } from "../deps.ts";

export default class ResourcesResource extends Drash.Http.Resource {
  static paths = ["/resources"];

  public async GET() {
    this.response.body = this.response.render("/templates/resources.html", {
      page_title: "resources|bueno",
      description:
        "A collection of various resources about web development techniques using deno and buildless methods.",
      customStyleResources: [],
    });
    return this.response;
  }

  public POST() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public DELETE() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public PUT() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }
}
