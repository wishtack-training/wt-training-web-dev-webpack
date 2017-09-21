/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from './user';

export class UserStore {


    constructor() {
        this._resourceUrl = 'http://wt-users.getsandbox.com/users';
        this.userList$ = new BehaviorSubject([]);
    }

    async addUser(user) {

        const response = await fetch(
            this._resourceUrl,
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const userData = await response.json();

        user = new User(userData);

        this._updateUserList([...this.userList$.value, user]);

    }

    async removeUser(userId) {

        await fetch(
            `${this._resourceUrl}/${encodeURIComponent(userId)}`,
            {
                method: 'DELETE'
            }
        );

        const userList = this.userList$.value
            .filter(user => userId !== user.id);

        this._updateUserList(userList);

    }

    async retrieveUserList() {

        const response = await fetch(this._resourceUrl);

        const userDataList = await response.json();

        const userList = userDataList
            .map(userData => new User(userData));

        this._updateUserList(userList);

    }

    _updateUserList(userList) {
        this.userList$.next(userList);
    }
}
