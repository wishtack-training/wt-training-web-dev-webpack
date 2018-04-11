/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

class UserListComponent extends HTMLElement {

    static get observedAttributes() {
        return [
            'wt-title'
        ];
    }

    constructor() {
        super();

        this._userStore = userStore;

    }

    attributeChangedCallback(attributeName, previousValue, currentValue) {
        console.log(attributeName);
        console.log(currentValue);
    }

    connectedCallback() {

        this._userList = this._userStore.getUserList();

        this._userStore.onChange(userList => {
            this._userList = userList;
            this.render();
        });

        this.render();
    }

    render() {

        this.innerHTML = null;

        const userElementList = this._userList.map(user => {

            const userElement = document.createElement('div');

            userElement.innerHTML = `
            <div>
                <img class="wt-picture" src="" alt="">
            </div>
            <div>
                <span class="wt-user-name"></span>
            </div>
            <div>
                <button
                    class="wt-remove-button"
                    type="button">REMOVE</button>
            </div>
            `;

            userElement.querySelector('img').src = `https://robohash.org/${encodeURIComponent(user.firstName)}?set=set4`;

            userElement.querySelector('.wt-user-name')
                .textContent = `${user.firstName} ${user.lastName}`;

            const buttonElement = userElement.querySelector('.wt-remove-button');

            buttonElement.addEventListener('click', () => {
                this._userStore.removeUser(user);
            });

            return userElement;

        });

        for (const userElement of userElementList) {
            this.appendChild(userElement);
        }

    }

}

customElements.define('wt-user-list', UserListComponent);
