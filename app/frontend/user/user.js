/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

export class User {

    constructor({id=null, firstName, lastName}) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    id() {
        return this._id;
    }

    firstName() {
        return this._firstName;
    }

    lastName() {
        return this._lastName;
    }

    json() {
        return JSON.stringify({
            id: this.id(),
            firstName: this.firstName(),
            lastName: this.lastName()
        });
    }

}