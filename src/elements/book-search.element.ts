import './book.element';
import { createQueryString } from '../helpers/create-query-string';
import { BookElement, Book } from './book.element';

class BookSearchElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /* html */ `
    <style>
      .book-list-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
      }

      @media(max-width: 600px, orientation: landscape) {
        .search-form {
          display: none;
        }
      }

    </style>
    <form id="searchForm" class="search-form">
    <fieldset>
      <legend>Search Criteria</legend>

      <div>
        <input
          name="keywords"
          placeholder="Book name or author..."
          type="text"
        />
      </div>

      <div>
        <input name="freeOnly" type="checkbox" /><span>Free Books Only</span>
      </div>

      <select name="language">
        <option value="en">🇬🇧 English</option>
        <option value="fr">🇫🇷 French</option>
      </select>
    </fieldset>

    <button type="submit">SEARCH</button>
  </form>
  <section id="searchResult" class="book-list-container"></section>`;

    const form = this.shadowRoot.querySelector('#searchForm');
    const searchResultEl = this.shadowRoot.querySelector('#searchResult');

    form.addEventListener('submit', async event => {
      event.preventDefault();

      const criteria = {
        keywords: (form.querySelector(
          'input[name=keywords]'
        ) as HTMLInputElement).value,
        language: (form.querySelector(
          'select[name=language]'
        ) as HTMLInputElement).value,
        freeOnly: (form.querySelector(
          'input[name=freeOnly]'
        ) as HTMLInputElement).checked
      };

      const queryParamMap = new Map();
      queryParamMap.set('q', criteria.keywords);
      queryParamMap.set('langRestrict', criteria.language);
      queryParamMap.set('maxResults', 40);
      if (criteria.freeOnly) {
        queryParamMap.set('filter', 'free-ebooks');
      }

      const queryString = createQueryString(queryParamMap);

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?${queryString}`
      );
      const data = await response.json();

      const bookList: Book[] = data.items.map(item => {
        return {
          id: item.id,
          title: item.volumeInfo.title,
          pictureUri: item.volumeInfo.imageLinks.thumbnail
        };
      });

      const bookElList = bookList.map(book => {
        const bookEl = document.createElement('mc-book') as BookElement;
        bookEl.book = book;
        return bookEl;
      });

      searchResultEl.innerHTML = '';
      searchResultEl.append(...bookElList);
    });
  }
}

customElements.define('mc-book-search', BookSearchElement);
