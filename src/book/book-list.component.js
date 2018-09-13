/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

import {bookRepository} from './book-repository';


export class BookListComponent extends HTMLElement {

    constructor() {
        super();

        this._render();

    }

    async _render() {

        const bookList = await bookRepository.searchBookList('extreme programming');

        this.innerHTML = '';

        for (const book of bookList) {

            const bookElement = document.createElement('article');

            bookElement.innerHTML = `
            <h1></h1>
            <img>
            `;
            bookElement.querySelector('h1').textContent = book.title;

            if (book.pictureUrl != null) {
                bookElement.querySelector('img').src = book.pictureUrl;
            }

            this.appendChild(bookElement);

        }

    }

}