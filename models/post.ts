import { v4, moment, slugify } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";

const pg = new PgService();

interface PostOptions {
  id?: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content: string;
  featured_image: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  publish_date_string?: string;
}

export class Post {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  featured_image: string;
  slug: string;
  created_at: string;
  updated_at: string;
  publish_date_string: string;

  constructor(
    {
      id,
      title,
      subtitle,
      excerpt,
      content,
      featured_image,
      slug,
      created_at,
      updated_at,
      publish_date_string,
    }: PostOptions,
  ) {
    Object.assign(
      this,
      {
        id,
        title,
        subtitle,
        excerpt,
        content,
        featured_image,
        slug,
        created_at,
        updated_at,
        publish_date_string,
      },
    );

    // check for existence of these members, if they don't exist generate them
    if (!id) {
      this.generateId();
    } else {
      this.id = id;
    }
    if (!slug) {
      this.generateSlug();
    } else {
      this.slug = slug;
    }
    if (!created_at) {
      this.generateCreatedAt();
    } else {
      this.created_at = created_at;
    }
    if (!updated_at) {
      this.updated_at = this.created_at;
    } else {
      this.updated_at = updated_at;
    }
    if (!publish_date_string) {
      this.generatePublishDateString();
    } else {
      this.publish_date_string = publish_date_string;
    }
  }

  generateId() {
    this.id = v4.generate();
  }

  generateSlug() {
    const strippedTitleString = this.title.replace(
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
  }

  generateCreatedAt() {
    this.created_at = moment().toISOString();
  }

  generateUpdatedAt() {
    this.updated_at = moment().toISOString();
  }

  generatePublishDateString() {
    this.publish_date_string = moment().format("MMMM Do YYYY, h:mm:ss a");
  }

  async create() {
    const response = await pg.create(this);
    // console.log(this);
    if (response.ok) {
      // this.response.body = JSON.stringify({ ok: true, slug: response.slug });
      // return this.response;
      return ({
        ok: true,
        slug: this.slug,
        updated_at: this.updated_at,
      });
    } else {
      // this.response.body = JSON.stringify(
      // { ok: false, message: "Something went wrong." },
      // )
      // return this.response;
      // return ({ ok: false });
    }
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
