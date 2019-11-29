// Print each to the screen

const names = ['Khurram', 'Nima', 'Travis', 'Karl'];

const printItem = function(item) {
  console.log('item: ', item);
};

// Looping through each item 
// AND Printing each item to the screen
const printEach = function(items) {
  for (const item of items) {
    printItem(item);
  }
};

// The problem we start seeing here is that 
// a. both functions are looping (repetitive code)
// b. both functions NEED the existence of the other named functions (printItem, collectItem)
// c. they are still doing something very specific (eg: looping and printing) instead of just ONE thing (eg: looping)
const collectEach = function(items) {
  for (const item of items) {
    collectItem(item);
  }
};

printEach(names);