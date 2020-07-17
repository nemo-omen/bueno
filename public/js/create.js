import markymark from "https://cdn.pika.dev/marky-marked@^5.0.3";
import "./components/b-dropzone.js";
import "./components/ld-dropzone.js";

const markdownElement = document.querySelector(".markdown-input");

const markdownInput = markymark(markdownElement);

const editor = document.querySelector("textarea.marky-editor");

markdownInput.on("markyblur", (event) => {
  const markdownContent = editor.value;
  console.log(markdownContent);
});
