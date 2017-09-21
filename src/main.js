/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */


'use strict';


const getUser = async () => {

    const response = await fetch('http://wt-users.getsandbox.com/users');

    const userList = await response.json();

    const userId = userList[0].id;

    const userResponse = await fetch(`http://wt-users.getsandbox.com/users/${userId}`);

    const user = await userResponse.json();

    return user;

};


import {UserStore} from './user/user-store';
import {UserFormComponent} from './user/user-form.component';
import {UserListComponent} from './user/user-list.component';

const renderComponent = ({selector, factory}) => {

    document.querySelectorAll(selector)
        .forEach((element) => {
            const component = factory({element});
            component.render();
        });

};

const userStore = new UserStore();

userStore.retrieveUserList();

renderComponent({
    selector: 'wt-user-form',
    factory: ({element}) => new UserFormComponent({element, userStore})
});

renderComponent({
    selector: 'wt-user-list',
    factory: ({element}) => new UserListComponent({element, userStore})
});
