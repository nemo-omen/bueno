import { Drash } from "../deps.ts";
import { moment } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";

const pg: PgService = new PgService();
// const ps = new PostsService();

export default class EditResource extends Drash.Http.Resource {
  static paths = ["/edit/:id"];

  public async GET() {
    console.log("/edit Get requested");
    const id = this.request.getPathParam("id");
    const response = await pg.getOne("posts", "id", id);
    const post = {
      ...response[0],
      updated_at: moment(response[0].updated_at).format("LLL"),
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
    const updatedPost: Object = this.request.getBodyParam("data");
    const response = await pg.update(
      {
        post: {
          ...updatedPost,
          updated_at: moment.utc().toDate().toUTCString(),
          featured_image: "https://picsum.photos/800/400",
        },
      },
    );
    if (!response) {
      console.log("No response...");
    }
    if (response.ok) {
      console.log("Response ok: ", response.updated_at);
      const updated_at = response.updated_at;
      this.response.body = JSON.stringify(
        { ok: true, updated_at: moment(updated_at).format("LLL") },
      );
    } else {
      console.log("Response not ok", response);
      this.response.body = JSON.stringify({ ok: false });
    }
    return this.response;
  }
}
