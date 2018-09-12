export class UserStore {

    constructor() {
        this._userList = [];
    }

    getUserList() {
        return this._userList;
    }

    addUser(user) {
        this._userList = [...this._userList, user];
    }

    removeUser(user) {
        this._userList = this._userList.filter(_user => _user !== user);
    }

}

export const userStore = new UserStore();
