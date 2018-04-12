/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */


'use strict';

import { UserStore, userStore } from '../user-store';
import { User } from './user';

export class UserFormComponent extends HTMLElement {

    private _userStore: UserStore;

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

            const firstNameElement = formElement
                .querySelector('input[name="firstName"]') as any;

            const firstName = firstNameElement.value;

            const lastNameElement = formElement
                .querySelector('input[name="lastName"]') as any;

            const lastName = lastNameElement.value;

            const user = new User({firstName, lastName});

            this._userStore.addUser(user);

            formElement.reset();

        });

    }

}

customElements.define('wt-user-form', UserFormComponent);
