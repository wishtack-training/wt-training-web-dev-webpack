/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

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

const test = () => {

    const user1 = new User('Foo', 'BAR');
    const user2 = new User('John', 'DOE');
    const user3 = new User('Foo', 'BAR');

    const userStore = new UserStore();

    const userListEmpty = userStore.getUserList();

    assertEquals(0, userListEmpty.length);

    userStore.addUser(user1);
    userStore.addUser(user2);
    userStore.addUser(user3);

    const userList1 = userStore.getUserList();

    assertEquals(3, userList1.length);
    assertEquals(user1, userList1[0]);
    assertEquals(user2, userList1[1]);
    assertEquals(user3, userList1[2]);

    userStore.removeUser(user1);

    const userList2 = userStore.getUserList();

    assertEquals(2, userList2.length);
    assertEquals(user2, userList2[0]);
    assertEquals(user3, userList2[1]);

};

test();
