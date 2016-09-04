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
    }

    removeUser({user}) {
        this._userList = this._userList.filter((value) => value !== user);
    }

    userList() {
        return this._userList;
    }

}