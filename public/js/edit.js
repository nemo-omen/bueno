import markymark from "https://cdn.pika.dev/marky-marked@^5.0.3";
import "./components/b-dropzone.js";

const imageUploadSection = document.getElementById("image-upload-section");
const featuredImageInput = document.getElementById("featured-image");
const imageUploadButton = document.getElementById("image-upload-button");
const imageUploadParagraph = document.querySelector(".image-upload-paragraph");

const titleInput = document.getElementById("title");
const subtitleInput = document.getElementById("subtitle");
const excerptInput = document.getElementById("excerpt");
const markdownElement = document.querySelector(".markdown-input");
const markdownInput = markymark(markdownElement);
const editor = document.querySelector("textarea.marky-editor");

editor.value = markdownElement.dataset.content;

const toolbar = document.querySelector(".marky-toolbar");

// trigger file input on imageUploadButton click
imageUploadSection.addEventListener("click", (event) => {
  featuredImageInput.click();
});

// drag and drop events
const ddEvents = ["dragenter", "dragleave", "dragover", "drop"];
const highlightEvents = ["dragenter", "dragover"];
const unhighlightEvents = ["dragleave", "drop"];

let featuredImageLocation = "";

ddEvents.forEach((eventName) => {
  imageUploadSection.addEventListener(eventName, preventDefaults, false);
});

highlightEvents.forEach((eventName) => {
  imageUploadSection.addEventListener(eventName, highlight, false);
});

unhighlightEvents.forEach((eventName) => {
  imageUploadSection.addEventListener(eventName, unhighlight, false);
});

imageUploadSection.addEventListener("drop", handleDrop, false);

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

function highlight(event) {
  imageUploadSection.classList.add("highlight");
}

function unhighlight(event) {
  imageUploadSection.classList.remove("highlight");
}

function handleDrop(event) {
  const dt = event.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  ([...files]).forEach(uploadFeaturedImage);
}

featuredImageInput.addEventListener("change", (event) => {
  uploadFeaturedImage(featuredImageInput.files[0]);
});

async function uploadFeaturedImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  console.log("file: ", file);
  const url = "/upload/image";
  const fetchOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  if (!data.ok) {
    console.log(data);
  } else {
    console.log(data);
    setFeatureImage(data.location);
  }
}

function setFeatureImage(backgroundLocation) {
  console.log(backgroundLocation);
  imageUploadSection.style.backgroundImage = `url(${backgroundLocation})`;
  featuredImageLocation = backgroundLocation;
  Array.from(imageUploadParagraph.classList).includes("hidden")
    ? null
    : imageUploadParagraph.classList.add("hidden");
}
const secondaryPublishButton = document.querySelector(
  ".post-publish-secondary-button",
);
const secondaryDraftButton = document.querySelector(
  ".post-draft-secondary-button",
);

const postId = secondaryPublishButton.dataset.postId;

const customButtonsTemplate = `
  <button class="post-publish-button" title="Publish" data-postid="${postId}"><i class="fas fa-upload"></i></button>
  <button class="post-draft-button" title="Save Draft" data-postid="${postId}"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>`;

toolbar.insertAdjacentHTML("afterbegin", customButtonsTemplate);

const publishButton = document.querySelector(".post-publish-button");
const draftButton = document.querySelector(".post-draft-button");
markdownInput.on("markyblur", (event) => {
  handleSave();
});
const draftButtons = [draftButton, secondaryDraftButton];
const publishButtons = [publishButton, secondaryPublishButton];

draftButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleSave(event.target.dataset.postid);
  });
});

publishButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    handleUpdate(event.target.dataset.postid);
  });
});

async function handleSave(id) {
  const title = titleInput.value;
  const subtitle = subtitleInput.value;
  const markdownContent = editor.value;
  const excerpt = excerptInput.value;
  const newPost = {
    id: id,
    title: title,
    subtitle: subtitle,
    content: markdownContent,
    excerpt: excerpt,
  };
}

const updateMessageSpan = document.querySelector(".update-message");
const updateDateSpan = document.querySelector(".update-date");

async function handleUpdate(id) {
  const title = titleInput.value;
  const subtitle = subtitleInput.value;
  const excerpt = excerptInput.value;
  const markdownContent = editor.value;

  const newPost = {
    id: id,
    title: title,
    subtitle: subtitle,
    excerpt: excerpt,
    content: markdownContent,
    featured_image: featuredImageLocation,
  };

  try {
    setStatus("Loading", { data: "Data Loading..." });
    const response = await fetch("/edit/:id", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: newPost }),
    });

    const data = await response.json();
    if (data.ok) {
      setStatus("Post saved", { ok: true });
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
