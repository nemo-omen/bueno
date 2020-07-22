import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { PgService } from "../services/postgres_service.ts";

const pg: PgService = new PgService();
// const ps = new PostsService();

export default class EditResource extends Drash.Http.Resource {
  static paths = ["/edit/:id"];

  public async GET() {
    console.log("/edit Get requested");
    const id = this.request.getPathParam("id");
    console.log(id);
    const response = await pg.getOne("posts", "id", id);
    const post = { ...response[0] };
    console.log(post);
    this.response.body = this.response.render(
      "/templates/edit.html",
      { post: post },
    );
    return this.response;
  }

  public async POST() {
    console.log("/edit POST requested");
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public DELETE() {
    console.log("/edit DELETE requested");
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public async PUT() {
    console.log("/edit PUT requested");
    const updatedPost = this.request.getBodyParam("post");
    const response = await pg.update(
      {
        post: {
          ...updatedPost,
          featured_image: "https://picsum.photos/800/400",
        },
      },
    );
    if (response.ok) {
      this.response.body = JSON.stringify({ ok: true });
    } else {
      this.response.body = JSON.stringify({ ok: false });
    }
    return this.response;
  }
}
