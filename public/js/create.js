import markymark from "https://cdn.pika.dev/marky-marked@^5.0.3";
import "./components/b-dropzone.js";

const titleInput = document.getElementById("title");
const subtitleInput = document.getElementById("subtitle");
const excerptInput = document.getElementById("excerpt");
const markdownElement = document.querySelector(".markdown-input");
const markdownInput = markymark(markdownElement);
const editor = document.querySelector("textarea.marky-editor");

const toolbar = document.querySelector(".marky-toolbar");

const customButtonsTemplate = `
  <button class="post-publish-button" title="Publish"><i class="fas fa-upload"></i></button>
  <button class="post-draft-button" title="Save Draft"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>`;

toolbar.insertAdjacentHTML("afterbegin", customButtonsTemplate);

const publishButton = document.querySelector(".post-publish-button");
const draftButton = document.querySelector(".post-draft-button");

markdownInput.on("markyblur", (event) => {
  handleSave();
});

draftButton.addEventListener("click", (event) => {
  handleSave();
});

publishButton.addEventListener("click", (event) => {
  handlePublish();
});

async function handleSave() {
  const title = titleInput.value;
  const subtitle = subtitleInput.value;
  const markdownContent = editor.value;
  const excerpt = excerptInput.value;
  const newPost = {
    title: title,
    subtitle: subtitle,
    content: markdownContent,
    excerpt: excerpt,
  };
}

async function handlePublish() {
  const title = titleInput.value;
  const subtitle = subtitleInput.value;
  const excerpt = excerptInput.value;
  const markdownContent = editor.value;
  const newPost = {
    title: title,
    subtitle: subtitle,
    excerpt: excerpt,
    content: markdownContent,
  };
  const response = await fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({ data: newPost }),
  });
  if (response.ok) {
    window.location = "/";
  } else {
    console.log(response.message);
  }
}
