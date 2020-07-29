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
    console.log(response);
    const post = {
      ...response.result[0],
      updated_at: moment(response.result[0].updated_at).format("LLL"),
      created_at: moment(response.result[0].created_at).format("LLL"),
    };
    console.log("/edit post: ", post);
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
    const requestPost: Object = this.request.getBodyParam("data");
    const post: any = { ...requestPost };
    const updatePost: Post = new Post({ ...post });
    const response = await updatePost.update();

    const data = response
      ? response
      : { ok: false, message: "There was no response..." };

    this.response.body = JSON.stringify(data);

    return this.response;
  }
}
