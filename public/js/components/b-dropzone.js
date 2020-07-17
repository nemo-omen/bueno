import {
  LitElement,
  html,
  css,
} from "../../web_modules/lit-element.js";

class BuenoDropzone extends LitElement {

  connectedCallback() {
    super.connectedCallback();
    const events = ['dragenter', 'dragleave', 'dragover', 'drop'];
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
      height: 6rem;
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
    <section @click="${this.handleClick}" class="dropzone-container">
      <p>Drop image here or click to select</p>
      <input type="file">
    </section>
    `;
  }
  handleClick() {
    alert('Hello');
  }
}

customElements.define("b-dropzone", BuenoDropzone);
