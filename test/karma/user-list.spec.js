/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

import {UserListController} from '../../app/frontend/user-list';
import {RemoteUserStore} from '../../app/frontend/user/remote-user-store';
import {User} from '../../app/frontend/user/user';

import {fakeAsync, tick} from '@angular/core/testing/fake_async';


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
            .forEach(methodName => userStorePrototype[methodName] = RemoteUserStore.prototype[methodName]);

    });

    afterEach(() => {

        Object.assign(RemoteUserStore.prototype, userStorePrototype);

        _reset();

    });

    it('should add users', fakeAsync(() => {

        let userNameElementList;

        /* Mocking. */
        RemoteUserStore.prototype.userList = jasmine.createSpy('addUser').and.returnValue(Promise.resolve([]));
        RemoteUserStore.prototype.addUser = jasmine.createSpy('addUser')
            .and.callFake(({user}) => Promise.resolve(user));

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

        tick();

        /* Checking results. */
        userNameElementList = testElement.querySelectorAll('#wt-user-list div>span');
        expect(userNameElementList.length).toEqual(2);
        expect(userNameElementList[0].innerText.trim()).toEqual('Foo BAR');
        expect(userNameElementList[1].innerText.trim()).toEqual('John BAR');

        /* Checking mocks.*/
        expect(RemoteUserStore.prototype.addUser.calls.count()).toEqual(2);
        expect(RemoteUserStore.prototype.addUser.calls.argsFor(0)[0].user.firstName()).toEqual('Foo');
        expect(RemoteUserStore.prototype.addUser.calls.argsFor(0)[0].user.lastName()).toEqual('BAR');
        expect(RemoteUserStore.prototype.addUser.calls.argsFor(1)[0].user.firstName()).toEqual('John');
        expect(RemoteUserStore.prototype.addUser.calls.argsFor(1)[0].user.lastName()).toEqual('BAR');

    }));

    it('should remove users', fakeAsync(() => {

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
        RemoteUserStore.prototype.removeUser = jasmine.createSpy('removeUser').and.returnValue(Promise.resolve());
        RemoteUserStore.prototype.userList = jasmine.createSpy('userList').and.returnValue(Promise.resolve(userList));

        /* Populating DOM. */
        testElement.innerHTML = `<div id="wt-user-list"></div>`;

        /* Playing with controller. */
        window.userListController = new UserListController();

        tick();

        /* Run async stuff in a fake async zone. */
        userNameElementList = testElement.querySelectorAll('#wt-user-list div>span');
        expect(userNameElementList.length).toEqual(2);

        testElement.querySelectorAll('#wt-user-list button')[1].click();

        tick();

        /* Checking results. */
        userNameElementList = testElement.querySelectorAll('#wt-user-list div>span');
        expect(userNameElementList.length).toEqual(1);
        expect(userNameElementList[0].innerText.trim()).toEqual('Foo BAR');

        /* Checking mocks. */
        expect(RemoteUserStore.prototype.removeUser.calls.count()).toEqual(1);
        expect(RemoteUserStore.prototype.removeUser.calls.argsFor(0)[0].user).toEqual(userList[1]);

    }));

});