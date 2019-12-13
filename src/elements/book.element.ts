export interface Book {
  title: string;
  pictureUri: string;
}

export class BookElement extends HTMLElement {

  private _book: Book;

  set book(book: Book) {
    this._book = book;
    this._render();
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <h2></h2>
    <img>
    `;
    this._render();
  }

  private _render() {
    if (this.shadowRoot == null) {
      return;
    }
    this.shadowRoot.querySelector('h2').textContent = this._book.title;
    this.shadowRoot.querySelector('img').src = this._book.pictureUri;
  }

}

customElements.define('mc-book', BookElement);