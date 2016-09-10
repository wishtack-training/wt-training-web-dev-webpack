/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {UserListController} from '../../app/frontend/user-list';
import {UserStore} from '../../app/frontend/user/user-store';
import {User} from '../../app/frontend/user/user';


describe('AppUserList', () => {

    let testElement;
    let userStorePrototype;

    /* Reset html testing zone. */
    let _reset = () => {

        testElement = document.querySelector('#test');

        if (testElement != null) {
            testElement.remove();
        }

        testElement = document.createElement('div');
        testElement.setAttribute('id', 'test');

        document.querySelector('body').appendChild(testElement);

    };

    beforeEach(() => {

        _reset();

        /* Backing up mocked methods. */
        userStorePrototype = {};
        ['addUser', 'removeUser', 'userList']
            .forEach(methodName => userStorePrototype[methodName] = UserStore.prototype[methodName]);

    });

    afterEach(() => {

        Object.assign(UserStore.prototype, userStorePrototype);

        _reset();

    });

    it('should add users', () => {

        let userNameElementList;

        /* Mocking. */
        UserStore.prototype.addUser = jasmine.createSpy('addUser');

        /* Populating DOM. */
        testElement.innerHTML = `
<form onsubmit="userListController.addUser({event: event})">
    <input type="text" name="firstName">
    <input type="text" name="lastName">
    <button type="submit">ADD</button>
</form>

<div id="wt-user-list"></div>
`;

        /* Playing with controller. */
        window.userListController = new UserListController();

        testElement.querySelector('input[name="firstName"]').value = 'Foo';
        testElement.querySelector('input[name="lastName"]').value = 'BAR';
        testElement.querySelector('button').click();

        testElement.querySelector('input[name="firstName"]').value = 'John';
        testElement.querySelector('input[name="lastName"]').value = 'BAR';
        testElement.querySelector('button').click();

        /* Checking results. */
        userNameElementList = testElement.querySelectorAll('#wt-user-list div>span');
        expect(userNameElementList.length).toEqual(2);
        expect(userNameElementList[0].innerText.trim()).toEqual('Foo BAR');
        expect(userNameElementList[1].innerText.trim()).toEqual('John BAR');

        /* Checking mocks.*/
        expect(UserStore.prototype.addUser.calls.count()).toEqual(2);
        expect(UserStore.prototype.addUser.calls.argsFor(0)[0].user.firstName()).toEqual('Foo');
        expect(UserStore.prototype.addUser.calls.argsFor(0)[0].user.lastName()).toEqual('BAR');
        expect(UserStore.prototype.addUser.calls.argsFor(1)[0].user.firstName()).toEqual('John');
        expect(UserStore.prototype.addUser.calls.argsFor(1)[0].user.lastName()).toEqual('BAR');

    });

    it('should remove users', () => {

        let userNameElementList;
        let userList = [
            new User({
                firstName: 'Foo',
                lastName: 'BAR'
            }),
            new User({
                firstName: 'John',
                lastName: 'BAR'
            })
        ];

        /* Mocking. */
        UserStore.prototype.removeUser = jasmine.createSpy('removeUser');
        UserStore.prototype.userList = jasmine.createSpy('userList').and.returnValue(userList);

        /* Populating DOM. */
        testElement.innerHTML = `<div id="wt-user-list"></div>`;

        /* Playing with controller. */
        window.userListController = new UserListController();

        userNameElementList = testElement.querySelectorAll('#wt-user-list div>span');
        expect(userNameElementList.length).toEqual(2);

        testElement.querySelectorAll('#wt-user-list button')[1].click();

        /* Checking results. */
        userNameElementList = testElement.querySelectorAll('#wt-user-list div>span');
        expect(userNameElementList.length).toEqual(1);
        expect(userNameElementList[0].innerText.trim()).toEqual('Foo BAR');

        /* Checking mocks. */
        expect(UserStore.prototype.removeUser.calls.count()).toEqual(1);
        expect(UserStore.prototype.removeUser.calls.argsFor(0)[0].user).toEqual(userList[1]);

    });

});