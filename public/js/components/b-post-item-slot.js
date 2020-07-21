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
    };
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
}

customElements.define("b-post-item-slot", BuenoPostItemSlot);
