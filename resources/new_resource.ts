import { Drash } from "../deps.ts";
import { moment, slugify, v4 } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";
import { Post } from "../models/post.ts";

const pg: PgService = new PgService();

export default class NewResource extends Drash.Http.Resource {
  static paths = ["/new"];

  public async GET() {
    console.log("create Get requested");
    this.response.body = this.response.render("/templates/new.html", {
      page_title: "new|bueno",
      description: "Create a new blog post",
      customStyleResources: [
        `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">`,
        `<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css">`,
      ],
      auth: true,
    });
    return this.response;
  }

  public async POST() {
    const requestPost: any = this.request.getBodyParam("data");
    const postTitle: string = requestPost.title;
    const strippedTitle = postTitle.replace(
      "[^0-9a-zA-Z]+",
      "",
    );

    const post: any = { ...requestPost };
    const newPost: Post = new Post(
      { ...post },
    );
    const response = await newPost.create();
    // const response = await pg.create(post);
    if (response.ok) {
      this.response.body = JSON.stringify(
        {
          ok: true,
          slug: response.slug,
          updated_at: moment(response.updated_at).format("LLL"),
        },
      );
      return this.response;
    } else {
      this.response.body = JSON.stringify(
        { ok: false },
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
