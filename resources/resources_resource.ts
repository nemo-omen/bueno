import { Drash } from "../deps.ts";

export default class ResourcesResource extends Drash.Http.Resource {
  static paths = ["/resources"];

  public async GET() {
    this.response.body = this.response.render("/templates/resources.html");
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
