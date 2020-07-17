import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";

const posts: Array<object> = [
  {
    _id: v4.generate(),
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    title: "Web components and deno",
    subtitle: "A match made in buildless heaven",
    content:
      `Web components are a really great fit if you want to build modular apps without using a build tool like Webpack or Rollup.`,
    excerpt:
      `Why deno might be the perfect runtime environment for developing buildless web apps.`,
    featuredImage: "https://picsum.photos/800/600",
  },
  {
    _id: v4.generate(),
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    title: "Why I like developing without build tools",
    subtitle: "It's all about simplicity",
    content:
      `Remember a year or so ago when people were sharing Marie Kondo advice all over the place? Developing without having to use tooling (unless you really want to) reminds me of that. It's not that tools like Webpack, Rollup, etc are bad. They're truly fantastic at what they do. It's just that configuring them, finding the proper plugins for what I'm trying to do, and wrestling with them when something isn't working correctly, doesn't spark joy for me.`,
    excerpt:
      `Coming back to web development after several years away was tough, until I discovered a different way.`,
    featuredImage: "https://picsum.photos/800/600",
  },
  {
    _id: v4.generate(),
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    title: "How I made this blog",
    subtitle: "Part 1: Introduction and setup",
    content:
      `This is going to be a series of blog posts about how I built this blog with deno, Drash, and LitElement.`,
    excerpt:
      `Let's make a full-featured blogging app without using any build tools, just  to see if we can.`,
    featuredImage: "https://picsum.photos/800/600",
  },
];

export class PostsService {
  public async allPosts() {
    const myPosts = [...posts];
    console.log("myPosts: ", myPosts);
    return myPosts;
  }
}
