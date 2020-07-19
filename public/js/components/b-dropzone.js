import {
  LitElement,
  html,
  css,
} from "../../web_modules/lit-element.js";

class BuenoDropzone extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    const events = ["dragenter", "dragleave", "dragover", "drop"];
  }
  static get styles() {
    return css`
    :root {
      box-sizing: border-box;
      --primary-gray: #282828;
      --light-gray: #919191;
    }
    .dropzone-container {
      box-sizing: border-box;
      background-color: #f6f6f6;
      width: 100%;
      height: 7rem;
      margin: 0;
      position: relative;
      border: 1px solid #e4e4e4;
      color: var(--lightGray);
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0.5rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all .2s ease-out;
    }
    .active {
      color: var(--primary-gray);
	    background-color: #f9f9f9;
	    border: 1px solid rgb(160, 198, 229);
    }
    input {
      display: none;
    }
    `;
  }
  render() {
    return html`
    <section id="dropzone-container">
      <p>Drop image here or click to select</p>
      <input type="file" id="image-input" @change="${
      this.uploadFeaturedImage(featuredImageInput.files[0])
    }">
    </section>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    const imageUploadSection = this.shadowRoot.getElementById(
      "dropzone-container",
    );
    const ddEvents = ["dragenter", "dragleave", "dragover", "drop"];
    const highlightEvents = ["dragenter", "dragover"];
    const unhighlightEvents = ["dragleave", "drop"];

    let featuredImageLocation = "";

    ddEvents.forEach((eventName) => {
      this.addEventListener(eventName, preventDefaults, false);
    });

    highlightEvents.forEach((eventName) => {
      this.addEventListener(eventName, highlight, false);
    });

    unhighlightEvents.forEach((eventName) => {
      this.addEventListener(eventName, unhighlight, false);
    });
    function preventDefaults(event) {
      event.preventDefault();
      event.stopPropagation();
    }
    function highlight(event) {
      imageUploadSection.classList.add("active");
    }

    function unhighlight(event) {
      imageUploadSection.classList.remove("active");
    }

    function handleDrop(event) {
      const dt = event.dataTransfer;
      const files = dt.files;

      handleFiles(files);
    }

    function handleFiles(files) {
      ([...files]).forEach(this.uploadFeaturedImage);
    }
  }

  uploadFeaturedImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    console.log("file: ", file);
    const url = "/upload";
    const fetchOptions = {
      method: "POST",
      body: formData,
    };

    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => JSON.parse(data))
      .then((data) => setFeatureImage(data.location))
      .catch((error) => {
        console.error(error);
      });
  }

  setFeatureImage(backgroundLocation) {
    console.log(backgroundLocation);
    imageUploadSection.style.backgroundImage = `url(${backgroundLocation})`;
    featuredImageLocation = backgroundLocation;
    Array.from(imageUploadParagraph.classList).includes("hidden")
      ? null
      : imageUploadParagraph.classList.add("hidden");
  }
}

customElements.define("b-dropzone", BuenoDropzone);
