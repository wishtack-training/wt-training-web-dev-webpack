
import { createQueryString } from './helpers/create-query-string';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#searchForm');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const criteria = {
      keywords: (form.querySelector('input[name=keywords]') as HTMLInputElement).value,
      language: (form.querySelector('select[name=language]') as HTMLInputElement).value,
      freeOnly: (form.querySelector('input[name=freeOnly]') as HTMLInputElement).checked
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

    const bookList = data.items.map(item => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        pictureUri: item.volumeInfo.imageLinks.thumbnail
      };
    });

    const bookElList = bookList.map(book => {
      const bookEl = document.createElement('div');
      bookEl.innerHTML = `
          <h2></h2>
          <img>
          `;
      bookEl.querySelector('h2').textContent = book.title;
      bookEl.querySelector('img').src = book.pictureUri;
      return bookEl;
    });

    document.querySelector('#searchResult').innerHTML = '';
    document.querySelector('#searchResult').append(...bookElList);
  });
});