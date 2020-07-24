import markymark from "https://cdn.skypack.dev/marky-marked";
import { featuredImageLocation } from "./image_upload.js";
import "./components/b-dropzone.js";

const titleInput = document.getElementById("title");
const subtitleInput = document.getElementById("subtitle");
const excerptInput = document.getElementById("excerpt");
const markdownElement = document.querySelector(".markdown-input");
const markdownInput = markymark(markdownElement);
const editor = document.querySelector("textarea.marky-editor");
const updateMessageSpan = document.querySelector(".update-message");
const updateDateSpan = document.querySelector(".update-date");

const toolbar = document.querySelector(".marky-toolbar");

const customButtonsTemplate = `
  <button class="post-publish-button" title="Publish"><i class="fas fa-upload"></i></button>
  <button class="post-draft-button" title="Save Draft"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>`;

toolbar.insertAdjacentHTML("afterbegin", customButtonsTemplate);

const publishButton = document.querySelector(".post-publish-button");
const draftButton = document.querySelector(".post-draft-button");

[publishButton, draftButton].forEach((element) =>
  element.dataset.postid = postId
);

const secondaryPublishButton = document.querySelector(
  ".post-publish-secondary-button",
);
const secondaryDraftButton = document.querySelector(
  ".post-draft-secondary-button",
);
markdownInput.on("markyblur", (event) => {
  handleSave();
});
const draftButtons = [draftButton, secondaryDraftButton];
const publishButtons = [publishButton, secondaryPublishButton];

draftButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleSave();
  });
});

publishButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handlePublish();
  });
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
    featured_image: featuredImageLocation,
  };
  try {
    // setStatus("Loading", { data: "Data Loading..." });
    const response = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: newPost }),
    });

    const responseJson = await response.json();
    const data = JSON.parse(responseJson);
    console.log("Data: ", data);
    if (data.ok) {
      setStatus("Post saved!", { ok: true });
      setUpdatedDate(data.updated_at);
    }
  } catch (error) {
    setStatus("There was an error. Try again.", { ok: false });
    console.error(error);
  }

  function setStatus(message, status) {
    updateMessageSpan.innerText = message;
    flashMessage(message, status);
  }

  function setUpdatedDate(dateString) {
    updateDateSpan.innerText = "Last updated at " + dateString;
  }

  function flashMessage(message, status) {
    if (status.ok) {
      updateDateSpan.classList.add("flash");
      updateMessageSpan.classList.add("flash");
      updateDateSpan.classList.contains("flash-error")
        ? updateDateSpan.classList.remove("flash-error")
        : null;
      updateMessageSpan.classList.contains("flash-error")
        ? updateMessageSpan.classList.remove("flash-error")
        : null;
      endFlash("flash");
    } else {
      console.log("Failure: ", status);
      updateDateSpan.classList.add("flash-error");
      updateMessageSpan.classList.add("flash-error");
      updateDateSpan.classList.contains("flash")
        ? updateDateSpan.classList.remove("flash")
        : null;
      updateMessageSpan.classList.contains("flash")
        ? updateMessageSpan.classList.remove("flash")
        : null;
      endFlash("flash-error");
    }
  }

  function endFlash(className) {
    setTimeout(() => {
      updateDateSpan.classList.remove(className);
      updateMessageSpan.classList.remove(className);
    }, 5000);
  }
}
