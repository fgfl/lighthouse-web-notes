// Implement our own forEach (let's implement forEachBackward)
const words = ['hello', 'lighthouse', 'world'];

const printItem = function(item) {
  console.log(item);
};

// This function is no longer print specific
const forEachBackward = function(items, performWithItem) {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    performWithItem(item);
  }
};

forEachBackward(words, printItem);

let collection = [];
forEachBackward(words, function(item) {
  if (item.length > 5) collection.push(item);
});

console.log('collection: ', collection);