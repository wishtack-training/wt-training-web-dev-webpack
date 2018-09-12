/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

import {userStore} from './user-store';
import {User} from './user';

export class UserFormComponent extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `<button>ADD</button>`;

        this.querySelector('button')
            .addEventListener('click', () => {
                userStore.addUser(new User('Foo', 'BAR'));
            });

    }

}
