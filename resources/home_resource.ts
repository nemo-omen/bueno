import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";
import { PgService } from "../services/postgres_service.ts";

const ps: PostsService = new PostsService();
const pg: PgService = new PgService();

export default class HomeResource extends Drash.Http.Resource {
  static paths: Array<string> = ["/"];

  public async GET() {
    // await pg.get(
    //   "SELECT * FROM posts ORDER BY created_at DESC;",
    // );
    const svcPosts: Array<Object> = await pg.get(
      "SELECT * FROM posts ORDER BY created_at DESC;",
    );
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
