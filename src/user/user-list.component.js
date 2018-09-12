import {userStore} from './user-store';

export class UserListComponent extends HTMLElement {

    constructor() {
        super();

        userStore.subscribe(userList => this._renderUserList(userList));

        // this.style.display = 'block';
        //
        // let marginLeft = 0;
        //
        // document.addEventListener('keydown', event => {
        //
        //     if (event.key === 'ArrowRight') {
        //         marginLeft += 10;
        //     }
        //
        //     if (event.key === 'ArrowLeft') {
        //         marginLeft -= 10;
        //     }
        //
        //     this.style.marginLeft = `${marginLeft}px`;
        //
        // });

    }

    _renderUserList(userList) {

        this.innerHTML = '';

        for (const user of userList) {

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
