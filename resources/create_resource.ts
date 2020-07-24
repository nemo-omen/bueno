import { Drash } from "../deps.ts";
import { moment } from "../deps.ts";
import { slugify } from "../deps.ts";
import { v4 } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";

const pg: PgService = new PgService();
// const ps = new PostsService();

export default class CreateResource extends Drash.Http.Resource {
  static paths = ["/create"];

  public async GET() {
    console.log("create Get requested");
    this.response.body = this.response.render("/templates/create.html");
    return this.response;
  }

  public async POST() {
    const requestPost: any = this.request.getBodyParam("data");
    const postTitle: string = requestPost.title;
    const post: any = {
      ...requestPost,
      id: v4.generate(),
      created_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
      // featured_image: "https://picsum.photos/800/400",
      slug: slugify(postTitle, {
        replacement: "_",
        remove: "[^A-z][\\\^]?",
        lower: true,
      }),
    };

    const response = await pg.create(post);
    if (response.ok) {
      this.response.body = JSON.stringify({ ok: true, slug: response.slug });
      return this.response;
    } else {
      this.response.body = JSON.stringify(
        { ok: false, message: "Something went wrong." },
      );
      return this.response;
    }
  }

  public DELETE() {
    console.log("create DELETE requested");
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public PUT() {
    console.log("create PUT requested");
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }
}
