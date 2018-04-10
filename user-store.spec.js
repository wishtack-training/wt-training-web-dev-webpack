/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

const assertEquals = (expected, value) => {

    if (expected !== value) {
        throw new Error(`Assertion error:
        Expected:
            ${expected}
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
        this._userList.push(user);
    }

    removeUser(user) {

        const userIndex = this._userList
            .indexOf(user);

        this._userList.splice(userIndex, 1);

    }

}

class User {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

const testAddUser = () => {

    const userStore = new UserStore();

    const user1 = new User('Foo', 'BAR');
    const user2 = new User('John', 'DOE');
    const user3 = new User('Foo', 'BAR');

    const userListEmpty = userStore.getUserList();

    assertEquals(0, userListEmpty.length);

    userStore.addUser(user1);
    userStore.addUser(user2);
    userStore.addUser(user3);

    const userList = userStore.getUserList();

    assertEquals(3, userList.length);
    assertEquals(user1, userList[0]);
    assertEquals(user2, userList[1]);
    assertEquals(user3, userList[2]);

};

const testRemoveUser = () => {

    const userStore = new UserStore();

    const user1 = new User('Foo', 'BAR');
    const user2 = new User('John', 'DOE');
    const user3 = new User('Foo', 'BAR');

    userStore.addUser(user1);
    userStore.addUser(user2);
    userStore.addUser(user3);

    userStore.removeUser(user1);

    const userList = userStore.getUserList();

    assertEquals(2, userList.length);
    assertEquals(user2, userList[0]);
    assertEquals(user3, userList[1]);

};

testAddUser();
testRemoveUser();
