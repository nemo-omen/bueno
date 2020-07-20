import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";
import { Marked } from "https://deno.land/x/markdown/mod.ts";

const ps = new PostsService();

export default class PostResource extends Drash.Http.Resource {
  static paths = ["/:slug"];

  public async GET() {
    const postSlug = this.request.getPathParam("slug");
    const postResponse: any = await ps.findPostBySlug(postSlug);

    // Parse the stored markdown so we can send html to client
    const unparsed = postResponse.content;
    const parsed = Marked.parse(unparsed);
    console.log('Parsed: ', parsed);
    const post: any = { ...postResponse, content: parsed };

    this.response.body = this.response.render("/templates/post.html", {
      post: post,
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
