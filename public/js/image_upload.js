const imageUploadSection = document.getElementById("image-upload-section");
const featuredImageInput = document.getElementById("featured-image");
const imageUploadButton = document.getElementById("image-upload-button");
const imageUploadParagraph = document.querySelector(".image-upload-paragraph");

// trigger file input on imageUploadButton click
imageUploadSection.addEventListener("click", (event) => {
  featuredImageInput.click();
});

// drag and drop events
const ddEvents = ["dragenter", "dragleave", "dragover", "drop"];
const highlightEvents = ["dragenter", "dragover"];
const unhighlightEvents = ["dragleave", "drop"];

export let featuredImageLocation = "";

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
  // console.log("file: ", file);
  const url = "/upload/image";
  const fetchOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, fetchOptions);
  const responseJson = await response.json();
  const data = JSON.parse(responseJson);
  if (!data.uploaded) {
    console.log("Failed: ", data);
  } else {
    console.log("Success: ", data);
    setFeatureImage(data.location);
  }
}

function setFeatureImage(backgroundLocation) {
  console.log("Background location: ", backgroundLocation);
  imageUploadSection.style.backgroundImage = `url(${backgroundLocation})`;
  featuredImageLocation = backgroundLocation;
  Array.from(imageUploadParagraph.classList).includes("hidden")
    ? null
    : imageUploadParagraph.classList.add("hidden");
}
