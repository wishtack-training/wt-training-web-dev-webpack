/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

export class UserListComponent {

    constructor({element, userStore}) {
        this._element = element;
        this._userStore = userStore;
    }

    render() {

        this._userStore.userList$
            .subscribe((userList) => this._render({userList}))

    }

    _render({userList}) {

        this._element.innerHTML = `<ul></ul>`;

        userList
            .forEach((user) => {

                const userElement = document.createElement('li');

                userElement.innerHTML = `
<span></span>
<button type="button">REMOVE</button>
`;

                userElement.querySelector('span').textContent = `${user.firstName} ${user.lastName}`;

                userElement.querySelector('button')
                    .addEventListener('click', () => {
                        this._userStore.removeUser(user);
                    });

                this._element.querySelector('ul')
                    .appendChild(userElement);

            });

    }

}
