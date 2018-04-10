
'use strict';

function main() {

    var value = null;

    setTimeout(function () {
        value = 'VALUE';
    }, 0);

    setTimeout(function () {
        console.log(value);
    }, 0);

    while (value === null) {
        console.log('waiting');
    }
    console.log(value);

}

main();
