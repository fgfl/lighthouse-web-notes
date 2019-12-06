const fs = require('fs').promises;

const p = fs.readFile('data/p1.txt', 'utf8'); // => Promise 1
// console.log('p first: ', p); // p.state => pending

const finalDoc = [];

p
  .then((data) => {
    // console.log('p after: ', p); // p.state => fulfilled
    // console.log('DATA: ', data);
    finalDoc.push(data);
    return fs.readFile('data/p2.txt', 'utf8') // => Promise 2
  })
  .then((data) => {
    finalDoc.push(data);
    return fs.readFile('data/p3.txt', 'utf8') // => Promise 3
  })
  .then((data) => {
    finalDoc.push(data);
    return fs.readFile('data/p4.txt', 'utf8') // => Promise 4
  })
  .then((data) => {
    finalDoc.push(data);
    console.log('in final .then, finalDoc = ', finalDoc);
  })
  .catch((err) => {
    console.log('in catch: ', finalDoc);
    console.log('Error: ', err.message);
  });
  
console.log('last line: ', finalDoc);



