
export class HelloElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 'Hello!';
  }
}

customElements.define('mc-hello', HelloElement);
