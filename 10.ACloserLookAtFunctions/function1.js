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
greeter('liym-ntai')
greeter('Alice')

greet('hello')('jonas')

const greetArrow = greeting => name => console.log(`${greeting} ${name}`);


greetArrow('hey')('liym-ntai') 
