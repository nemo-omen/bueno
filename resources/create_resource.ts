import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";

const ps = new PostsService();

export default class CreateResource extends Drash.Http.Resource {
  static paths = ["/create"];

  public async GET() {
    this.response.body = this.response.render("/templates/create.html");
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
