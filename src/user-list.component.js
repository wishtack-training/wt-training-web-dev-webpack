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

            const userContainerElement = document.createElement('div');

            userContainerElement.innerHTML = `
            <wt-user></wt-user>
            <div>
                <button
                    class="wt-remove-button"
                    type="button">REMOVE</button>
            </div>
            `;

            const userElement = userContainerElement
                .querySelector('wt-user');

            userElement.user = user;

            const buttonElement = userContainerElement.querySelector('.wt-remove-button');

            buttonElement.addEventListener('click', () => {
                this._userStore.removeUser(user);
            });

            return userContainerElement;

        });

        for (const userElement of userElementList) {
            this.appendChild(userElement);
        }

    }

}

customElements.define('wt-user-list', UserListComponent);
