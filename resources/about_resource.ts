import { Drash } from "../deps.ts";

export default class AboutResource extends Drash.Http.Resource {
  static paths = ["/about"];

  public async GET() {
    this.response.body = this.response.render("/templates/about.html");

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
