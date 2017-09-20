/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

import {User} from './user';

export class UserFormComponent {

    constructor({element, userStore}) {
        this._element = element;
        this._userStore = userStore;
    }

    render() {
        this._element.innerHTML = `
<form>

    <span></span>

    <input
        name="firstName"
        type="text">

    <input
        name="lastName"
        type="text">
           
   <button type="submit">ADD</button>
    
</form>
        `;

        const form = this._element.querySelector('form');

        form.addEventListener('submit', (event) => {

            event.preventDefault();

            const user = new User(
                form.querySelector('input[name="firstName"]').value,
                form.querySelector('input[name="lastName"]').value
            );

            this._userStore.addUser(user);

        });

    }

}
