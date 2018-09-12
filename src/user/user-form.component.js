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
        this.innerHTML = `
<form>

<fieldset>

    <legend>User info</legend>

    <label for="firstName">First name</label>
    <input
        id="firstName"
        name="firstName"
        required
        type="text">
    
    <label for="firstName">Last name</label>
    <input id="lastName" name="lastName" type="text">
    
    <button type="submit">ADD</button>

</fieldset>

</form>`;

        const form = this.querySelector('form');
        const firstNameInput = form.querySelector('input[name="firstName"]');
        const lastNameInput = form.querySelector('input[name="lastName"]');
        const button = form.querySelector('button[type="submit"]');

        button.disabled = !form.checkValidity();
        form.addEventListener('input', () => button.disabled = !form.checkValidity());

        form.addEventListener('submit', event => {

            event.preventDefault();

            const firstName = firstNameInput.value;
            const lastName = lastNameInput.value;

            userStore.addUser(new User(firstName, lastName));

            form.reset();

        });

    }

}
