import {
  LitElement,
  html,
  css,
} from "https://cdn.skypack.dev/lit-element";

class BuenoPostListItem extends LitElement {
  static get properties() {
    return {
      _id: { type: String },
      createdAt: { type: String },
      title: { type: String },
      subtitle: { type: String },
      content: { type: String },
      featuredImage: { type: String },
    };
  }

  render() {
    return html`
    <section style="background-image: url('${this.featuredImage}')">
    <footer>
      <h2>${this.title}</h2>
      <h3>${this.subtitle}</h3>
      <p>${this.content}</p>
    </footer>
    </section>
    `;
  }
}

customElements.define("b-post-item", BuenoPostListItem);
