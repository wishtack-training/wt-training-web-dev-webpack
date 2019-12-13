import { html, render } from 'lit-html';

export class HelloElement extends HTMLElement {
  connectedCallback() {
    const name = 'Foo Bar';
    render(html`<h1>Hello ${name}</h1>`, this);
  }
}

customElements.define('mc-hello', HelloElement);
