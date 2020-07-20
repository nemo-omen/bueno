import { Drash } from "../deps.ts";

export default class UploadResource extends Drash.Http.Resource {
  static paths = ["/upload/image"];

  public GET() {
    this.response.body = JSON.stringify({ message: "Not implemented" });
    console.log("upload Get requested");
    return this.response;
  }

  public async POST() {
    console.log("/upload Post requested");
    const file: any = this.request.getBodyFile("file");

    if (!file) {
      throw new Drash.Exceptions.HttpException(
        400,
        "This resource requires a file to be uploaded.",
      );
    }

    const outputFile: any = `./public/assets/uploads/${
      file.filename.replace(/\s/g, "_").replace("-", "_")
    }`;

    Deno.writeFileSync(outputFile, file.content);

    this.response.body = JSON.stringify({
      uploaded: true,
      location: outputFile.replace(".", ""),
    });

    return this.response;
  }

  public DELETE() {
    console.log("/upload Delete requested");
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }

  public PUT() {
    console.log("/upload Put requested");
    this.response.body = JSON.stringify({ message: "Not implemented" });
    return this.response;
  }
}
