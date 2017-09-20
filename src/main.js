

import {UserStore} from './user-store';
import {User} from './user/user';

class UserListController {

    constructor() {
        this._userStore = new UserStore();
    }

    run() {

        const form = document.querySelector('form');

        form.addEventListener('submit', (event) => {

            event.preventDefault();

            const user = new User(
                form.querySelector('input[name="firstName"]').value,
                form.querySelector('input[name="lastName"]').value
            );

            this._userStore.addUser(user);

            this._renderUserList();

        });

        this._renderUserList();

    }

    _renderUserList() {

        const userListElement = document.querySelector('ul');

        userListElement.innerHTML = '';

        this._userStore.getUserList()
            .forEach((user) => {

                const userElement = document.createElement('li');

                userElement.innerHTML = `
<span></span>
<button>REMOVE</button>
`;
                userElement.querySelector('span').textContent = `${user.firstName} ${user.lastName}`;

                userElement.querySelector('button')
                    .addEventListener('click', () => this._removeUser(user));

                userListElement.appendChild(userElement);

            });


    }

    _removeUser(user) {
        this._userStore.removeUser(user);
        this._renderUserList();
    }

}

new UserListController().run();
