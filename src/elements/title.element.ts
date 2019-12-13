import { LitElement, html, property, customElement } from 'lit-element';

@customElement('mc-title')
export class TitleElement extends LitElement {

  @property() title: string;

  render() {
    return html`<h1>Welcome to ${this.title}</h1>`;
  }

}
