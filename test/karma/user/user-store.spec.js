
import {User} from '../../../app/frontend/user/user';
import {UserStore} from '../../../app/frontend/user/user-store';

describe('UserStore', () => {

    it('should add users', () => {
        
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

        expect(userStore.userList().length).toEqual(2);
        expect(userStore.userList()[0].firstName()).toEqual('Foo');
        expect(userStore.userList()[0].lastName()).toEqual('BAR');
        expect(userStore.userList()[1].firstName()).toEqual('John');
        expect(userStore.userList()[1].lastName()).toEqual('BAR');

    });

    it('should remove users', () => {

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
        userStore.addUser({
            user: new User({
                firstName: 'Foo',
                lastName: 'BAR'
            })
        });

        userStore.removeUser({
            user: userStore.userList()[0]
        });

        expect(userStore.userList().length).toEqual(2);
        expect(userStore.userList()[0].firstName()).toEqual('John');
        expect(userStore.userList()[0].lastName()).toEqual('BAR');
        expect(userStore.userList()[1].firstName()).toEqual('Foo');
        expect(userStore.userList()[1].lastName()).toEqual('BAR');

    });

});

