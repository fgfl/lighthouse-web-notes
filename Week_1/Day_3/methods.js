const myObj = {
  firstName: 'Alison',
  lastName: 'Wonderland',
  sayHi: function () {
    console.log('hello there!');
  },
  sayFullName: function () {
    console.log(`${this.firstName} ${this['lastName']}`);
  }
};
// let myName = "firstName"
// myObj[myName];
// myObj.myName;
// console.log(myObj);
// myObj['sayHi']();
// myObj.sayHi();
for (const key in myObj) {
  console.log(key, myObj[key]);
}
