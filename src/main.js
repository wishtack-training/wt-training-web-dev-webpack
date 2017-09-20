/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */


'use strict';

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

renderComponent({
    selector: 'wt-user-form',
    factory: ({element}) => new UserFormComponent({element, userStore})
});

renderComponent({
    selector: 'wt-user-list',
    factory: ({element}) => new UserListComponent({element, userStore})
});
