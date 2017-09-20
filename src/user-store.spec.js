/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

import { UserStore } from './user-store';
import { User } from './user';

const userStore = new UserStore();

const user1 = new User('Foo', 'BAR');
const user2 = new User('John', 'DOE');
const user3 = new User('Foo', 'BAR');

const userList1 = userStore.getUserList();

userStore.addUser(user1);
userStore.addUser(user2);
userStore.addUser(user3);

const userList2 = userStore.getUserList();

userStore.removeUser(user3);

const userList3 = userStore.getUserList();

console.log(userList1); // []
console.log(userList2); // [user1, user2, user3]
console.log(userList3); // [user1, user2]
