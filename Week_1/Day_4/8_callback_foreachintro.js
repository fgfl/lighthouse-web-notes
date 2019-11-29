// Callbacks Intro
// Function to Loop through each item and print out the output

const items = [2, 4, 'hello', 'there'];

const myFunction = function(item) {
  console.log(item);
};

// callback function intro!
items.forEach(myFunction);

// ANONYMOUS VERSION (DEFINED INLINE WITHOUT A VARIABLE)

// callback function intro!
items.forEach(function(item) {
  console.log(item);
});