
import {fakeAsync, tick} from '@angular/core/testing/fake_async';
import {User} from '../../../app/frontend/user/user';
import {UserStore} from '../../../app/frontend/user/user-store';

describe('UserStore', () => {

    it('should add users', fakeAsync(() => {

        let userList;
        let userStore = new UserStore();

        userStore.addUser({
            user: new User({
                firstName: 'Foo',
                lastName: 'BAR'
            })
        });
        userStore.addUser({
            user: new User({
                firstName: 'John',
                lastName: 'BAR'
            })
        });

        userStore.userList().then(_userList_ => userList = _userList_);

        tick();

        expect(userList.length).toEqual(2);
        expect(userList[0].firstName()).toEqual('Foo');
        expect(userList[0].lastName()).toEqual('BAR');
        expect(userList[1].firstName()).toEqual('John');
        expect(userList[1].lastName()).toEqual('BAR');

    }));

    it('should remove users', fakeAsync(() => {

        let userList;
        let userStore = new UserStore();

        userStore.userList().then(_userList_ => userList = _userList_);

        tick();

        userStore.addUser({
            user: new User({
                firstName: 'Foo',
                lastName: 'BAR'
            })
        });
        userStore.addUser({
            user: new User({
                firstName: 'John',
                lastName: 'BAR'
            })
        });
        userStore.addUser({
            user: new User({
                firstName: 'Foo',
                lastName: 'BAR'
            })
        });

        userStore.removeUser({
            user: userList[0]
        });

        userStore.userList().then(_userList_ => userList = _userList_);

        tick();

        expect(userList.length).toEqual(2);
        expect(userList[0].firstName()).toEqual('John');
        expect(userList[0].lastName()).toEqual('BAR');
        expect(userList[1].firstName()).toEqual('Foo');
        expect(userList[1].lastName()).toEqual('BAR');

    }));

});

