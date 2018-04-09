/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

class Customer {

    constructor(public name: string) {
    }

}

const customer = new Customer('Foo DOE');

document.querySelector('body').textContent = customer.name;
