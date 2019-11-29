// Functions are Values... What does this mean?

// Output: greeting to given name
let greet = function(name) {
  return ('Hello ' + name);
};

console.log(greet); // greet is NOT being called. It is being referenced

// Things you might here people say:
// In JS, Functions are first class citizens.
// JS is a functional language

const sayHello = greet;

console.log(sayHello);