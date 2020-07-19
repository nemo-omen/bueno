import { load } from "https://deno.land/x/tiny_env/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";
import { posts } from "./dummyPosts.ts";
import {
  DataTypes,
  Database,
  Model,
} from "https://deno.land/x/denodb@v1.0.4/mod.ts";

// load .env file @ root of project
await load();

// config db
const db = new Database({
  dialect: "postgres",
  debug: false,
}, {
  host: Deno.env.get("DB_HOST"),
  port: parseInt(Deno.env.get("DB_PORT")),
  username: Deno.env.get("DB_USER"),
  password: Deno.env.get("DB_PASSWORD"),
  database: "bueno_blog",
});

// define post model
class Post extends Model {
  static table = "posts";
  static timestamps = true;

  static fields = {
    _id: {
      type: DataTypes.UUID,
    },
    slug: DataTypes.STRING,
    publishDateString: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    excerpt: DataTypes.STRING,
    content: DataTypes.STRING,
    featuredImage: DataTypes.STRING,
  };
}

// connect model to db & sync
db.link([Post]);
await db.sync();

// class & methods for interacting with db
export class PostsService {
  public async allPosts() {
    const response = await Post.orderBy({ updatedAt: "desc" }).all();

    const myPosts = response.map((post) => {
      if (post.excerpt === null) {
        const newExcerpt = post.content.substring(0, 150);
        return { ...post, excerpt: newExcerpt };
      } else {
        return { ...post };
      }
    });

    return myPosts;
  }

  public async findPostBySlug(postSlug) {
    const returnedPost = await Post.where("slug", postSlug).get();

    const mappedReturn = returnedPost.map((post) => {
      return { ...post };
    });

    return mappedReturn[0];
  }

  public async createPost(post: any) {
    await Post.create({
      _id: post._id,
      publishDateString: post.createdAt,
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
    });

    return { ok: true };
  }

  public async updatePost(post: any) {
    await Post.where("_id", post._id).update({
      title: post.title,
      subtitle: post.suntitle,
      content: post.content,
      featuredImage: post.featuredImage,
    });
  }
}
