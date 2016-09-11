/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {User} from './user';

export class RemoteUserStore {

    static _API_URL = 'http://localhost:8000/api/v1/';
    static _RESOURCE_NAME = 'users';

    userList() {
        return window.fetch(this._resourceUrl(), {})
            .then(response => response.json())
            .then(data => data.objects.map(userData => new User(userData)));
    }

    addUser({user}) {
        return window.fetch(this._resourceUrl(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: user.json()
        })
            .then(response => response.json())
            .then(data => new User(data));
    }

    removeUser({user}) {
        return window.fetch(`${this._resourceUrl()}${user.id()}/`, {
            method: 'DELETE'
        });
    }

    _resourceUrl() {
        return `${RemoteUserStore._API_URL}${RemoteUserStore._RESOURCE_NAME}/`;
    }

}
