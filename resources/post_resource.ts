import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";
import { Marked } from "https://deno.land/x/markdown/mod.ts";
import { PgService } from "../services/postgres_service.ts";

const pg: PgService = new PgService();
const ps: PostsService = new PostsService();
export default class PostResource extends Drash.Http.Resource {
  static paths = ["/:slug"];

  public async GET() {
    const postSlug = this.request.getPathParam("slug");
    // const postResponse: any = await ps.findPostBySlug(postSlug);
    const postResponse: any = await pg.getOne("posts", "slug", postSlug);

    const returnedPost = postResponse[0];
    // Parse the stored markdown so we can send html to client
    const unparsed = returnedPost.content;
    const parsed = Marked.parse(unparsed);
    const post: any = {
      id: returnedPost.id,
      slug: returnedPost.slug,
      publishDateString: returnedPost.publish_date_string,
      title: returnedPost.title,
      subtitle: returnedPost.subtitle,
      excerpt: returnedPost.excerpt,
      content: parsed,
      featuredImage: returnedPost.featured_image,
      createdAt: returnedPost.createdAt,
      updatedAt: returnedPost.updatedAt,
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

  public DELETE() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public PUT() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }
}
