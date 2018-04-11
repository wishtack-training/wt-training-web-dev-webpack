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
        this._history = [];
        this._userList = [];
    }

    getUserList() {
        return this._userList;
    }

    addUser(user) {
        this._updateUserList([...this._userList, user]);
    }

    removeUser(user) {
        const userList = this._userList
            .filter(_user => user !== _user);
        this._updateUserList(userList);
    }

    _updateUserList(userList) {
        this._userList = userList;
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

    userStore.addUser(user1);
    userStore.addUser(user2);
    userStore.addUser(user3);

    const userList = userStore.getUserList();

    assertEquals(0, userListEmpty.length);

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

    const userListFull = userStore.getUserList();

    userStore.removeUser(user1);

    const userList = userStore.getUserList();

    assertEquals(3, userListFull.length);

    assertEquals(2, userList.length);
    assertEquals(user2, userList[0]);
    assertEquals(user3, userList[1]);

};

const testGetUserList = () => {

    const userStore = new UserStore();

    const userList1 = userStore.getUserList();
    const userList2 = userStore.getUserList();

    assertEquals(userList1, userList2);

};

testAddUser();
testRemoveUser();
testGetUserList();
