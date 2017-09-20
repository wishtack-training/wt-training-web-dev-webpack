/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

import { User } from './user';
import { UserStore } from './user-store';

const userStore = new UserStore();
const user = new User('Foo', 'BAR');

userStore.addUser(user);

console.log(userStore.getUserList());