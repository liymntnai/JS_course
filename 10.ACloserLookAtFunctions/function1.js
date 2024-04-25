'use strict'

const oneWord = function (str) {
    console.log(str);
    const words = str.split(' ')
    const names =[]

    for (const word of words) {
         names.push(word.replace(/i/g,''))
    }
    return names.join(' ');
    
    // return str.replace('i', '').toLowerCase();
}

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' '); //Rest pattern
    return [first.toUpperCase(), ...others].join(' ');
};

// Higher Order function

const transform = function (str,fn) {
    console.log('Original string: '+str);
    console.log('Transformed string: '+fn(str));
    console.log('Transformed by: '+fn.name);
    
}
// transform('liym-ntai is big',upperFirstWord)
transform('liym-ntai is big', oneWord)

// FUNCTION RETURNING FUNCTIONS

const greet = function(greeting){
    return function (name) {
        console.log(`${greeting} ${name}`);
    }
}
const greeter = greet('hey')
greeter('Alice')

greet('hello')('jonas')

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);


greetArrow('hey')('liym-ntai')  

// The call and apply methods

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function(flightNum, name){}
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline}
        flight: ${this.iataCode} ${flightNum}`);
        this.bookings.push({flight: `${this.iataCode} ${flightNum}`, name});
        
    },

}
lufthansa.book(239, 'Jonas S.')
lufthansa.book(364, 'Liym-ntai')


const euroWings = {
    airline: 'EuroWings',
    iataCode: 'EW',
    bookings: []
}

const book = lufthansa.book;
// Does not work
// book(23, 'Sarah Willaiams')
console.log('book.call euroWings');

book.call(euroWings , 23, 'Williams')
book.call(lufthansa , 231, 'JAMES')

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'SW',
    bookings: []
}
book.call(swiss,564,'Mary Blight')

// Apply method
const flightData = [452, 'George Cooper']
// Even thought the apply method is not that used in modern javascript
book.apply(swiss, flightData)

// We can still use the call method instead like this
book.call(swiss, ...flightData)


// Bind method
// It also allows us to manually set the this keyword for any fxn call
// it does not immediately call the fxn, instead it returns a new fxn where the this keyword is is bound
const bookEW = book.bind(euroWings)
const bookSwiss = book.bind(swiss)
bookEW(23, 'Sergeo Polo')

// Partial application. A part of the original fxn has already been declared
const bookEW23 = book.bind(euroWings, 23)
bookEW23('Alina Mpung')

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function(){
    this.planes++;
    console.log(this.planes);
    
}
document.querySelector('#buy').addEventListener('click',
    lufthansa.buyPlane.bind(lufthansa)
);

// Another partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// Create a fxn that can return a fxn that does what this does

const addTaxRate= function(rate){
    return function(value){
        return value + value * rate;
    }
}
console.log(addTaxRate(0.25)(700));
