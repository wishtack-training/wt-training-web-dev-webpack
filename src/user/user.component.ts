/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */


'use strict';

import { User } from './user';

export class UserComponent extends HTMLElement {

    private _user: User;

    constructor() {
        super();
        this._user = null;
    }

    set user(user: User) {
        this._user = user;
        this._render();
    }

    connectedCallback() {
        this._render();
    }

    _render() {

        this.innerHTML = `
        <div>
            <img class="wt-picture" src="" alt="">
        </div>
        <div>
            <span class="wt-user-name"></span>
        </div>
        `;


        this.querySelector('img').src = `https://robohash.org/${encodeURIComponent(this._user.firstName)}?set=set4`;

        this.querySelector('.wt-user-name')
            .textContent = `${this._user.firstName} ${this._user.lastName}`;

    }

}

customElements.define('wt-user', UserComponent);
