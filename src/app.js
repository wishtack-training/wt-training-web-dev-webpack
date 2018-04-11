/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

class UserFormComponent {

    constructor(containerElement, userStore) {
        this._containerElement = containerElement;
        this._userStore = userStore;
    }

    render() {

        this._containerElement.innerHTML = `
        <form>
            <input name="firstName" type="text">
            <input name="lastName" type="text">
            <button type="submit">ADD</button>
        </form>
        `;

        const formElement = this._containerElement.querySelector('form');

        formElement.addEventListener('submit', event => {

            event.preventDefault();

            const firstName = formElement
                .querySelector('input[name="firstName"]').value;

            const lastName = formElement
                .querySelector('input[name="lastName"]').value;

            const user = new User(firstName, lastName);

            this._userStore.addUser(user);

            formElement.reset();

        });

    }

}

class UserListComponent {

    constructor(containerElement, userStore) {

        this._containerElement = containerElement;
        this._userStore = userStore;

        this._userList = this._userStore.getUserList();

        this._userStore.onChange(userList => {
            this._userList = userList;
            this.render();
        });

    }

    render() {

        this._containerElement.innerHTML = null;

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
            this._containerElement.appendChild(userElement);
        }

    }

}

const userStore = new UserStore();

document.querySelectorAll('wt-user-form')
    .forEach(containerElement => {
        new UserFormComponent(
            containerElement,
            userStore
        )
            .render();
    });


const userListComponent = new UserListComponent(
    document.querySelector('wt-user-list'),
    userStore
);

userListComponent.render();
