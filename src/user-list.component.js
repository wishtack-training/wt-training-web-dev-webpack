import {userStore} from './user-store';

export class UserListComponent extends HTMLElement {

    constructor() {
        super();

        this.innerText = 'hello world!';

        for (const user of userStore.getUserList()) {

            const userElement = document.createElement('div');

            userElement.innerHTML = `
<div>
    <div><img src="" alt=""></div>
    <div id="wt-user-name"></div>
</div>
`;

            userElement.querySelector('img').src = `https://robohash.org/${encodeURIComponent(user.firstName)}`;

            userElement.querySelector('#wt-user-name').textContent = `${user.firstName} ${user.lastName}`;

            this.appendChild(userElement);

        }

    }

}
