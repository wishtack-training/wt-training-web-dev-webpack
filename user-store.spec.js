/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

class User {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

const assertEquals = (expectedValue, value) => {

    if (value !== expectedValue) {
        throw new Error(`Assertion error:
        Expected:
            ${expectedValue}
        Got:
            ${value}
        `);
    }

};

class UserStore {

    constructor() {
        this._userList = [];
    }

    getUserList() {
        return this._userList;
    }

    addUser(user) {
        this._userList = [...this._userList, user];
    }

    removeUser(user) {
        this._userList = this._userList.filter(_user => _user !== user);
    }

}

const test = () => {

    const user1 = new User('Foo', 'BAR');
    const user2 = new User('John', 'DOE');
    const user3 = new User('Foo', 'BAR');

    const userStore = new UserStore();

    const userListEmpty = userStore.getUserList();

    userStore.addUser(user1);
    userStore.addUser(user2);
    userStore.addUser(user3);

    const userList1 = userStore.getUserList();

    userStore.removeUser(user1);

    const userList2 = userStore.getUserList();

    assertEquals(0, userListEmpty.length);

    assertEquals(3, userList1.length);
    assertEquals(user1, userList1[0]);
    assertEquals(user2, userList1[1]);
    assertEquals(user3, userList1[2]);

    assertEquals(2, userList2.length);
    assertEquals(user2, userList2[0]);
    assertEquals(user3, userList2[1]);

};

test();

const main = () => {

    const userStore = new UserStore();

    userStore.addUser(new User('Foo', 'BAR'));
    userStore.addUser(new User('John', 'DOE'));

    const userListContainer = document.querySelector('#wt-user-list');

    for (const user of userStore.getUserList()) {

        const userElement = document.createElement('div');

        userElement.innerHTML = `
<div>
    <div><img src="" alt=""></div>
    <div id="wt-user-name"></div>
</div>
`;

        userElement.querySelector('img').src = `https://robohash.org/${encodeURIComponent(user.firstName)}`;

        userElement.querySelector('#wt-user-name').textContent = `${user.firstName} ${user.lastName}`;

        userListContainer.appendChild(userElement);

    }

};

document.addEventListener('DOMContentLoaded', () => main());
