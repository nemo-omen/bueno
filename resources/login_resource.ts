import { Drash } from "../deps.ts";

export default class LoginResource extends Drash.Http.Resource {
  static paths = ["/login"];

  public async GET() {
    this.response.body = this.response.render("/templates/login.html", {
      page_title: "login|bueno",
      description: "Login!",
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
