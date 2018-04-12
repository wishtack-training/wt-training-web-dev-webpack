/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';


class UserFormComponent extends HTMLElement {

    constructor() {
        super();
        this._userStore = userStore;
    }

    connectedCallback() {

        this.innerHTML = `
        <form>
            <input name="firstName" type="text">
            <input name="lastName" type="text">
            <button type="submit">ADD</button>
        </form>
        `;

        const formElement = this.querySelector('form');

        formElement.addEventListener('submit', event => {

            event.preventDefault();

            const firstName = formElement
                .querySelector('input[name="firstName"]').value;

            const lastName = formElement
                .querySelector('input[name="lastName"]').value;

            const user = new User({firstName, lastName});

            this._userStore.addUser(user);

            formElement.reset();

        });

    }

}

customElements.define('wt-user-form', UserFormComponent);
