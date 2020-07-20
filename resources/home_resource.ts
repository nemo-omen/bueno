import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";

const ps: PostsService = new PostsService();

export default class HomeResource extends Drash.Http.Resource {
  static paths: Array<string> = ["/"];

  public async GET() {
    const svcPosts: Array<Object> = await ps.allPosts();
    const posts: Array<Object> = [...svcPosts];

    this.response.body = this.response.render("/templates/home.html", {
      posts: posts,
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
