/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {UserStore} from './user/user-store';
import {User} from './user/user';
import {RemoteUserStore} from './user/remote-user-store';

export class UserListController {

    constructor() {

        this._userStore = new RemoteUserStore();

        this._userListElementSelector = '#wt-user-list';

        this._userStore.userList()
            .then((userList) => {
                userList.forEach(user => this._injectUser({user: user}));
            });

    }

    addUser({event}) {

        let inputList;
        let user;
        let userData = {};

        /* Preventing form from really submitting. */
        event.preventDefault();

        inputList = event.target.querySelectorAll('input');

        Object.keys(inputList)
            .map(index => inputList[index])
            .forEach((input) => {
                userData[input.name] = input.value;
            });

        user = new User(userData);

        this._userStore.addUser({user: user})
            .then(user => this._injectUser({user: user}));

    }

    _injectUser({user}) {

        /* Save element into user. */
        user.element = this._createUserElement({user: user});

        /* Display user. */
        document.querySelector(this._userListElementSelector).appendChild(user.element);

    }

    _createUserElement({user}) {
        let element = document.createElement('div');
        element.innerHTML = `
<span>
    <span class="wt-first-name"></span>
    <span class="wt-last-name"></span>
</span>
<button type="button">REMOVE</button>
`;
        element.querySelector('.wt-first-name').innerText = user.firstName();
        element.querySelector('.wt-last-name').innerText = user.lastName();
        element.querySelector('button').addEventListener('click', () => this._removeUser({user: user}));
        return element;
    }

    _removeUser({user}) {

        this._userStore.removeUser({user: user})
            .then(() => user.element.remove());

    }

}

/* Wait for DOM to be loaded. */
window.addEventListener('load', () => {
    window.userListController = new UserListController();
});
