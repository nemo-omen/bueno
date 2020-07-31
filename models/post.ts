import { v4, moment, slugify } from "../deps.ts";
import { PgService } from "../services/postgres_service.ts";

// make a new postgres service
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
    // if (created_at) {
    //   this.created_at = created_at;
    // } else {
    //   this.generateCreatedAt();
    // }
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

  // save to db
  async create() {
    this.created_at = moment().toISOString();
    this.updated_at = moment().toISOString();
    const response = await pg.create(this);
    if (response.ok) {
      return {
        ok: true,
        slug: this.slug,
        updated_at: this.updated_at,
      };
    } else {
      return ({ ok: false });
    }
  }

  async update() {
    try {
      const savedPostResult = await pg.getOne("posts", "id", this.id);
      const savedPost = savedPostResult.result[0];
      this.created_at = savedPost.created_at.toISOString();
      this.updated_at = moment().toISOString();
      const response = await pg.update(this);
      if (response.ok) {
        return {
          ok: true,
          slug: this.slug,
          updated_at: moment(this.updated_at).format("LLL"),
        };
      } else {
        return { ok: false, response: response };
      }
    } catch (error) {
      console.error(error);
      return { ok: false, error: error };
    }
  }

  static async remove(id: string) {
    try {
      const response = await pg.delete(id);

      if (response.ok) {
        return response;
      } else {
        return { ok: false };
      }
    } catch (error) {
      console.error(error);
      return { ok: false, error: error };
    }
  }

  draft() {
  }

  publish() {
  }
}
