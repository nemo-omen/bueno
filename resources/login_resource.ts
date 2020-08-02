import { Drash } from "../deps.ts";

export default class LoginResource extends Drash.Http.Resource {
  static paths = ["/login", "login/:authParam"];

  public async GET() {
    const authParam = this.request.getPathParam('authParam');
    console.log('authParam: ', authParam);
    let auth = false;
    if(!authParam) {
      auth = false;
    }else{
      auth = true;
    }
    this.response.body = this.response.render("/templates/login.html", {
      page_title: "login|bueno",
      description: "Login!",
      customStyleResources: [],
      auth: auth
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
