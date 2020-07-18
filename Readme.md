<header style="text-align: center;"></header>
  <img src="https://raw.githubusercontent.com/nemo-omen/bueno/main/public/img/BUENO.svg" style="width: 200px; height: auto">
  <h1>An example blog made with <a href="https://deno.land/">deno</a> and <a href="https://drash.land/drash/#/">Drash</a></h1>
</header>

## What's this?
This will be a working example of a blog made with deno and drash, with a web component or two thrown in for good measure. With any luck this will also be the foundation for an ongoing blog about web development that focuses on buildless techniques and deno.

**This is not yet a working blog. Installing this right now might be fun if you want to build the whole thing before I write the tutorials but I seriously doubt you'll find much utility otherwise.**

## Installation

Get this repository using `git clone https://github.com/nemo-omen/bueno.git` or, (my personal preference,) `npx degit nemo-omen/bueno` so you aren't downloading the `git` part of this repo.

```shell
npm install
```

Haha! I know, but this is a deno project, right? Yes, it is, but we're using [LitElement](https://lit-element.polymer-project.org/) and I prefer to have that dependency local rather than making a call to a CDN from the front-end. So, we're installing it with NPM and then we're going to -

```shell
npx snowpack
```

That way [snowpack](https://www.snowpack.dev/) can make the LitElement module available inside of the `public/web_modules` directory, which we can then use as an ESM module in our front-end.

## Todo
- Auth
- DB
- Find a nicer library for the editor component
- Start using [Trex]() for dependency local management(?)

## Inspiration/Resources
[Develop and docerize a blogging API with deno](https://dev.to/fhsinchy/develop-and-dockerize-a-blogging-api-with-deno-oak-and-mysql-170e)

[Main branch of above tutorial](https://github.com/fhsinchy/deno-blog/blob/master/controllers/auth.ts)

[Authentication for actual humans](https://dev.to/ghardin137/web-authentication-for-actual-humans-part-one-36ho)

[Drash - resource-level middleware](https://drash.land/drash/#/tutorials/middleware/adding-resource-level-middleware)

[slugify](https://deno.land/x/slugify)

[bcrypt](https://deno.land/x/bcrypt)

[djwt](https://deno.land/x/djwt)

[deno postgres driver](https://deno.land/x/postgres)

[deno mongo](https://deno.land/x/mongo)