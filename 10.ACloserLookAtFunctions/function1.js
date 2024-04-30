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

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose,
 and an array with the number of replies for each option. 
 This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. 
  The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3,
   increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if 
   the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// # Coding Challenge

const poll = {
    question: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'Rust', 'Java'],
    // This generates [0,0,0,0]
    answers: new Array(4).fill(0),
    registerNewAnswer: function () {
        const favNumber = Number(prompt(' What is your favourite programming language?' + '\n'
            + '0: JavaScript\n'
            + '1: Python\n'
            + '2: Rust\n'
            + '3: C++\n'
            + '(Write option number)'));
            return favNumber;
    }
 
}

console.log(poll.registerNewAnswer());


