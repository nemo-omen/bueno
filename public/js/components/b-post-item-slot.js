import {
  LitElement,
  html,
  css,
} from "../../web_modules/lit-element.js";

class BuenoPostItemSlot extends LitElement {
  static get properties() {
    return {
      _id: { type: String },
      createdAt: { type: String },
      title: { type: String },
      subtitle: { type: String },
      excerpt: { type: String },
      slug: { type: String },
      visible: { type: String },
    };
  }

  constructor() {
    super();
    this.visible = true;
    setInterval(() => {
      this.visible = false;
    }, 1000);
  }

  render() {
    return html`
    <section class="post-list-item-section">
      <header class="post-list-item-header">
          <slot name="post-title"></slot>
          <slot name="post-date"></slot>
        </header>
        <slot name="post-excerpt"></slot>
        <footer class="post-list-item-footer">
          <slot name="post-control"></slot>
        </footer>
      </section>
    `;
  }

  updated(changedProperties) {
    if (!this.visible) {
      this.remove;
    }
  }

  remove() {
    // let start = null;
    const element = this.shadowRoot.querySelector(".post-list-item-section");
    // const startHeight = parseFloat(
    //   window.getComputedStyle(element, null).height,
    // );
    // const duration = 400;

    // element.style.display = "block";
    element.classList.add("hidden");

    // function step(timestamp) {
    //   if (!start) start = timestamp;
    //   let progress = timestamp - start;
    //   let height = (element.style.height != "")
    //     ? parseFloat(element.style.height)
    //     : startHeight;

    //   element.style.height = --height + "px";

    //   if (progress < duration) {
    //     window.requestAnimationFrame(step);
    //   }
    // }

    // window.requestAnimationFrame(step);
  }

  static get styles() {
    return css`
    .post-list-item-section {
      font-size: 24px;
      display: flex;
      flex-direction: column;
      margin: 0 0 1rem 0;
      color: #fff;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      color: #282828;
      overflow: hidden;
      transition: all 0.4ms ease-out;
      opacity: 1;
    }
    .hidden {
      margin: 0;
      padding: 0;
      transform: scaleX(0);
      opacity: 0;
    }
    .post-list-item-header {
      background-color: #fff;
      color: var(--fireTruck);
      margin-bottom: 1rem;
    }
    .post-list-item-title {
        font-size: 1.5rem;
        margin: 0 0 0.5rem 0;
        padding: 0;
    }
    .post-list-item-date {
        margin: 0;
        font-size: 0.75rem;
    }
    .post-list-item-excerpt {
      line-height: 150%;
      font-size: 1rem;
      margin: 0;
    }
    .post-list-item-footer {
      margin-top: 0.5rem;
      opacity: 0;
      transition: all .2s ease-out;
    }
    .post-list-item-footer:hover {
      opacity: 1;
    }
    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }`;
  }
}

customElements.define("b-post-item-slot", BuenoPostItemSlot);
