const fs = require('fs');

let finalDoc = [];

fs.readFile('data/p1.txt', 'utf8', (err, data) => {
  console.log(data);
  finalDoc.push(data);
  fs.readFile('data/p2.txt', 'utf8', (err, data) => {
    console.log(data);
    finalDoc.push(data);
    fs.readFile('data/p3.txt', 'utf8', (err, data) => {
      console.log(data);
      finalDoc.push(data);
      fs.readFile('data/p4.txt', 'utf8', (err, data) => {
        console.log(data);
        finalDoc.push(data);
        console.log(finalDoc);
      });
    });
  });
});


console.log(finalDoc);