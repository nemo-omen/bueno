import { pgService } from "../services/postgres_service.ts";
import { v4, moment } from "../deps.ts";
import { slugify } from "../deps.ts";

const pg = new pgService();

export class Post {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  featured_image: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  publish_date_string: string;

  constructor(titleString: string) {
    this.id = v4.generate();

    const strippedTitleString = titleString.replace(
      "[^0-9a-zA-Z]+",
      "",
    );

    this.slug = slugify(
      strippedTitleString,
      {
        replacement: "_",
        remove: "'",
        lower: true,
      },
    );

    this.publish_date_string = moment().format("MMMM Do YYYY, h:mm:ss a");
  }

  create(post: Post) {
  }

  remove() {
  }

  update() {
  }

  delete() {
  }

  draft() {
  }

  publish() {
  }
}
