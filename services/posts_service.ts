import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";

const dummyJS = "```console.log('Hello, world!')```";

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
    featuredImage: "https://picsum.photos/800/400",
    slug: "web_components_and_deno",
  },
  {
    _id: v4.generate(),
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    title: "Why I like developing without build tools",
    subtitle: "It's all about simplicity",
    content:
      `Remember a year or so ago when people were sharing Marie Kondo advice all over the place? Developing without having to use tooling (unless you really want to) reminds me of that. It's not that tools like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/guide/en/), [Parcel](https://parceljs.org/), etc are bad. They're truly fantastic at what they do. It's just that configuring them, finding the proper plugins for what I'm trying to do, and wrestling with them when something isn't working correctly, *doesn't spark joy for me*.`,
    excerpt:
      `Coming back to web development after several years away was tough, until I discovered a different way.`,
    featuredImage: "https://picsum.photos/800/400",
    slug: "why_i_like_developing_without_build_tools",
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
    featuredImage: "https://picsum.photos/800/400",
    slug: "how_i_made_this_blog",
  },
  {
    _id: v4.generate(),
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    title: "An example without a featured image",
    content:
      `I just want to have an example post without a featured image to work with so I can make sure the styling is good. The other thing I should make sure to do is include some code blocks, because that's certainly going to be needed in a blog about coding.

<pre><code class="lang-javascript">console.log('Hello, world!')</code></pre>

Okay, let's do another paragraph with some inline code. How about a nice <code class="lang-javascript">const name = 'Jeff Caldwell';</code> to see how it displays inside a paragraph.

I might need to use another theme or make some customizations to this one.
`,
    excerpt:
      `We're going to need a dummy example with some code blocks to make sure we're formatting that correctly.`,
    slug: "an_example_without_a_featured_image",
  },
];

export class PostsService {
  public async allPosts() {
    const myPosts = [...posts];
    return myPosts;
  }
  public async findPostBySlug(postSlug) {
    const returnedPost = posts.find((post: any) => post.slug === postSlug);
    return returnedPost;
  }
}
