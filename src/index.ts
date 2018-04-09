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

export class AppComponent extends HTMLElement {

    static observedAttributes = [
        'user-id'
    ];

    constructor() {

        super();

        this.innerHTML = `
<div>
    <span class="name"></span>
</div>`;

    }

    attributeChangedCallback(attributeName, previousValue, currentValue) {
        this.querySelector('.name').textContent = `${customer.name} (${currentValue})`;
    }


}

customElements.define('wt-app', AppComponent);
