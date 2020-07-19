import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const ps = new PostsService();

export default class CreateResource extends Drash.Http.Resource {
  static paths = ["/create"];

  public async GET() {
    this.response.body = this.response.render("/templates/create.html");
    return this.response;
  }

  public async POST() {
    const requestPost = this.request.getBodyParam("data");
    const postTitle = requestPost.title;
    const postExcerpt = requestPost.excerpt === ""
      ? requestPost.content.substring(0, 200)
      : requestPost.excerpt;
    const post: any = {
      ...requestPost,
      _id: v4.generate(),
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      featuredImage: "https://picsum.photos/800/400",
      excerpt: postExcerpt,
      slug: slugify(postTitle, {
        replacement: "_",
        remove: null,
        lower: true,
      }),
    };
    const response = await ps.createPost(post);
    if (response.ok) {
      return this.response.redirect(301, `/${post.slug}`);
    } else {
      this.response.body = JSON.stringify(
        { ok: false, message: "Something went wrong." },
      );
      return this.response;
    }
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
