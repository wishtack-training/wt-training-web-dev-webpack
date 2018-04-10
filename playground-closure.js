
'use strict';

function main() {

    var value = null;

    setTimeout(function () {
        value = 'VALUE';
    }, 0);

    setTimeout(function () {
        console.log(value);
    }, 0);

    console.log(value);

}

main();
