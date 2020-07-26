import { Drash } from "../deps.ts";
import { Marked } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";
import { Post } from "../models/post.ts";

const pg: PgService = new PgService();

export default class PostResource extends Drash.Http.Resource {
  static paths = ["/:slug"];

  public async GET() {
    const postSlug = this.request.getPathParam("slug");
    const postResponse: any = await pg.getOne("posts", "slug", postSlug);
    const returnedPost = postResponse.result[0];

    // Parse the stored markdown so we can send html to client
    // Todo: move this into middleware ... maybe

    const unparsed = returnedPost.content;
    const parsed = Marked.parse(unparsed);

    const post: any = {
      ...returnedPost,
      content: parsed,
    };

    this.response.body = this.response.render("/templates/post.html", {
      post: post,
    });

    return this.response;
  }

  public POST() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public async DELETE() {
    const id = this.request.getBodyParam("id");
    try {
      const response = await Post.remove(id);
      if (response.ok) {
        this.response.body = JSON.stringify({ ok: true, id: id });
      } else {
        console.log("There was an error");
        this.response.body = JSON.stringify({ ok: false });
      }
    } catch (error) {
      console.error(error);
    }
    return this.response;
  }

  public PUT() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }
}
