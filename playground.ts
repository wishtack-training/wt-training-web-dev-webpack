class Citizen {

    firstName;
    lastName;

    constructor(firstName = null, lastName = null) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayHi() {
        console.log(`Hello ${this.firstName} ${this.lastName}.`);
    }

    sayHiLater() {

        setTimeout(() => {
            this.sayHi();
        }, 1000);

    }

}

const citizen = new Citizen('Foo', 'BAR');

citizen.sayHi();

citizen.sayHiLater();

const productList = [
    {
        name: 'IntelliJ',
        price: 20
    },
    {
        name: 'BrowserStack',
        price: 30
    },
    {
        name: 'Keyboard',
        price: 10
    }
];

const cheapProductNameList = productList
    .filter(product => product.price < 25)
    .map(product => product.name);

console.log(cheapProductNameList);

const totalCheapProductsPrice = productList
    .filter(product => product.price < 25)
    .map(product => product.price)
    .reduce((result, price) => result + price, 0);

console.log(totalCheapProductsPrice);
