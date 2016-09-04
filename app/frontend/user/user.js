/**
 *
 * (c) 2013-2016 Wishtack
 *
 * $Id: $
 */

export class User {

    constructor({firstName, lastName}) {
        this._firstName = firstName;
        this._lastName = lastName;
    }

    firstName() {
        return this._firstName;
    }

    lastName() {
        return this._lastName;
    }

}