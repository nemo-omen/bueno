import {
  LitElement,
  html,
  css,
} from "https://cdn.skypack.dev/lit-element";

class BuenoPostItem extends LitElement {
  static get properties() {
    return {
      _id: { type: String },
      createdAt: { type: String },
      title: { type: String },
      subtitle: { type: String },
      content: { type: String },
      excerpt: { type: String },
      featuredImage: { type: String },
    };
  }

  static get styles() {
    return css`
.post-list-item-section {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem 0;
  color: #fff;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  color: #282828;
}
.post-list-item-header {
  background-color: #fff;
  color: #282828;
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
}`;
  }

  render() {
    return html`
    <section class="post-list-item-section">
      <header class="post-list-item-header">
        <h2 class="post-list-item-title">
          ${this.title}
        </h2>
        <p class="post-list-item-date">
          ${this.createdAt}
        </p>
      </header>
      <footer class="post-list-item-footer">
        <p class="post-list-item-excerpt">${
      this.content.substring(0, 254)
    } ...</p>
      </footer>
  </section>
    `;
  }
}

customElements.define("b-post-item", BuenoPostItem);
