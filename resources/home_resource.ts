import { Drash } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";
import { moment } from "../deps.ts";

const pg: PgService = new PgService();

export default class HomeResource extends Drash.Http.Resource {
  static paths: Array<string> = ["/"];

  public async GET() {
    try {
      const svcPosts: any = await pg.getAllSorted(
        "posts",
        "created_at",
      );
      if (svcPosts.length > 0) {
        const posts: Array<any> = [...svcPosts];

        this.response.body = this.response.render("/templates/home.html", {
          posts: posts,
          page_title: "bueno",
          description:
            "Bueno, a blog about web development with deno and (mostly) without build tools.",
        });
      } else {
        this.response.body = this.response.render("/templates/home.html", {
          posts: [],
        });
      }
    } catch (error) {
      console.error(error);
      this.response.body = JSON.stringify({ ok: false, error: error });
    }
    // this.response.headers.append("Content-Encoding", "gzip");
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
