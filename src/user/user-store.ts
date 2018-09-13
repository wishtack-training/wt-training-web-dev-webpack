import { User } from './user';

export class UserStore {

    private _callbackList = [];
    private _userList: User[] = [];

    getUserList() {
        return this._userList;
    }

    addUser(user: User) {
        this._userList = [user, ...this._userList];
        this._notify();
    }

    removeUser(user: User) {
        this._userList = this._userList.filter(_user => _user !== user);
        this._notify();
    }

    subscribe(callback) {
        this._callbackList.push(callback);
        callback(this._userList);
    }

    _notify() {
        for (const callback of this._callbackList) {
            callback(this._userList);
        }
    }

}

export const userStore = new UserStore();
