/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';



class UserStore {

    constructor() {
        this._listenerList = [];
        this._userList = [];
    }

    getUserList() {
        return this._userList;
    }

    addUser(user) {
        this._updateUserList([...this._userList, user]);
    }

    onChange(listener) {
        this._listenerList.push(listener);
    }

    removeUser(user) {
        const userList = this._userList
            .filter(_user => user !== _user);
        this._updateUserList(userList);
    }

    _updateUserList(userList) {

        this._userList = userList;

        this._listenerList.forEach(listener => {
            listener(userList);
        });

    }

}

// @HACK: THIS IS UGLY!!! 🤮
// Cf. Webpack.
const userStore = new UserStore();
