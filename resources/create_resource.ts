import { Drash } from "../deps.ts";
import { PostsService } from "../services/posts_service.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const ps = new PostsService();

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
      _id: v4.generate(),
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      featuredImage: "https://picsum.photos/800/400",
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
