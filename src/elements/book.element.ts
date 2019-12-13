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
    this.shadowRoot.innerHTML = /* html */`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-radius: 20px;
        border-width: 1px;
        overflow: hidden;
        width: 100%;
      }

      img {
        flex: 1;
        object-fit: cover;
      }

      @media (min-width: 600px) {
        :host {
          width: 300px;
        }
      }
    </style>
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