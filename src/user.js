/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

export class User {

    constructor({firstName, lastName = null}) {

        this.firstName = firstName;
        this.lastName = lastName;
    }

}
