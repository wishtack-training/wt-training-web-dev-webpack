/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class UserStore {

    constructor() {
        this.userList$ = new BehaviorSubject([]);
    }

    addUser(user) {
        this._updateUserList([...this.userList$.value, user]);
    }

    removeUser(user) {
        const userList = this.userList$.value.filter(_user => user !== _user);
        this._updateUserList(userList);
    }

    _updateUserList(userList) {
        this.userList$.next(userList);
    }

}
