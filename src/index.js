import {userStore} from './user-store';
import {User} from './user';
import {UserListComponent} from './user-list.component';

export const main = () => {

    userStore.addUser(new User('Foo', 'BAR'));
    userStore.addUser(new User('John', 'DOE'));

    customElements.define('wt-user-list', UserListComponent);

};

document.addEventListener('DOMContentLoaded', () => main());
