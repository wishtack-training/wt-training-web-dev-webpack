/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */


import {fakeAsync, tick} from '@angular/core/testing/fake_async';
import {User} from '../../../app/frontend/user/user';
import {RemoteUserStore} from '../../../app/frontend/user/remote-user-store';


describe('RemoteUserStore', () => {

    it('should get users list', fakeAsync(() => {

        let userList;
        let userStore = new RemoteUserStore();

        FetchMock.expectGET(/\/users\/$/, {
            status: 200,
            body: {
                meta: {
                    totalCount: 3
                },
                objects: [
                    {
                        id: 'USER1',
                        firstName: 'Foo',
                        lastName: 'BAR'
                    },
                    {
                        id: 'USER2',
                        firstName: 'John',
                        lastName: 'BAR'
                    }
                ]
            }
        }, true);

        userStore.userList().then(_userList_ => userList = _userList_);

        FetchMock.flush();
        tick();

        expect(userList.length).toEqual(2);
        expect(userList[0].firstName()).toEqual('Foo');
        expect(userList[0].lastName()).toEqual('BAR');
        expect(userList[1].firstName()).toEqual('John');
        expect(userList[1].lastName()).toEqual('BAR');

    }));

    it('should add users', fakeAsync(() => {

        let user;
        let userStore = new RemoteUserStore();
        spyOn(window, 'fetch').and.callThrough();

        FetchMock.expectPOST(/\/users\/$/, {
            status: 201,
            body: {
                id: 'USER1',
                firstName: 'Foo',
                lastName: 'BAR'
            }
        }, true);

        userStore.addUser({user: new User({firstName: 'Foo', lastName: 'BAR'})})
            .then(_user_ => user = _user_);

        FetchMock.flush();
        tick();

        expect(window.fetch.calls.argsFor(0)[1].method).toEqual('POST');
        expect(window.fetch.calls.argsFor(0)[1].headers['Accept']).toEqual('application/json');
        expect(window.fetch.calls.argsFor(0)[1].headers['Content-Type']).toEqual('application/json');
        expect(JSON.parse(window.fetch.calls.argsFor(0)[1].body).firstName).toEqual('Foo');
        expect(JSON.parse(window.fetch.calls.argsFor(0)[1].body).lastName).toEqual('BAR');

        expect(user.id()).toEqual('USER1');
        expect(user.firstName()).toEqual('Foo');
        expect(user.lastName()).toEqual('BAR');

    }));

    it('should remove users', fakeAsync(() => {

        let userStore = new RemoteUserStore();
        spyOn(window, 'fetch').and.callThrough();

        FetchMock.expectDELETE(/\/users\/USER1\/$/, {
            status: 204,
            body: {}
        }, true);

        userStore.removeUser({user: new User({id: 'USER1', firstName: 'Foo', lastName: 'BAR'})});

        FetchMock.flush();
        tick();

    }));

});
