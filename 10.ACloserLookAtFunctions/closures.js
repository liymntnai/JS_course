'use strict'
// Closures

const secureBooking = function () {
    let passengerCount = 0;
    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking();
booker(); //booker1
booker(); //booker2
booker(); //booker3

// So we can say that closure makes a fxn remember all the variables that
// existed at the fxn's birthplace essentially