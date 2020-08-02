import { Drash } from "../deps.ts";
import { moment } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";
import { Post } from "../models/post.ts";

const pg: PgService = new PgService();
// const ps = new PostsService();

export default class EditResource extends Drash.Http.Resource {
  static paths = ["/edit/:id"];

  public async GET() {
    console.log("/edit Get requested");
    const id = this.request.getPathParam("id");
    const response = await pg.getOne("posts", "id", id);
    const post = {
      ...response.result[0],
      update_date_string: moment(response.result[0].updated_at).format("LLL"),
    };
    console.log("/edit post: ", post);
    const rawContent = post.content;
    console.log("Raw Content length: ", rawContent.length);
    this.response.body = this.response.render(
      "/templates/edit.html",
      {
        post: post,
        page_title: "edit|bueno",
        description: "Editing an existing blog entry.",
        customStyleResources: [
          `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">`,
          `<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css">`,
        ],
        content: rawContent,
        auth: false
      },
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
    const requestPost: Object = this.request.getBodyParam("data");
    const post: any = { ...requestPost };
    console.log("Put post: ", post);
    const updatePost: Post = new Post({ ...post });
    console.log("Update post: ", updatePost);
    const response = await updatePost.update();

    const data = response
      ? response
      : { ok: false, message: "There was no response..." };

    this.response.body = JSON.stringify(data);

    return this.response;
  }
}
