/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

export class UserStore {

    constructor() {
        this._userList = [];
    }

    addUser({user}) {
        this._userList.push(user);
        return Promise.resolve(user);
    }

    removeUser({user}) {
        this._userList = this._userList.filter((value) => value !== user);
        return Promise.resolve();
    }

    userList() {
        return Promise.resolve(this._userList);
    }

}