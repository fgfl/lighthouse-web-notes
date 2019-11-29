const myObj = {};

const anotherKey = 'isAwake';
myObj[anotherKey] = 'red';

myObj['wholeNewKey'] = 'something else';
myObj.wholeNewKey = 'value';

// console.log(myObj['doesNotExist']);

// dot notation
myObj.color = 'orange';
console.log(myObj);
