// I have a bunch of children
// and I need to keep track of their information

// const child1 = 'Alice';
// const child2 = 'Bob';
// const child3 = 'Carol';

// const children = ['Alice', 'Bob', 'Carol'];

// const child1Age = 12;
// const child2Age = 7;
// const child3Age = 8;

// const ages = [12, 7, 8];

// const child1Toy = 'cars';
// const child2Toy = 'robots';
// const child3Toy = 'dolls'

// const toys = ['cars', 'robots', 'dolls'];

const children = [
  [ 'Alice', 12, 'cars' ],
  [ 'Bob', 7, 'robots' ],
  [ 'Carol', 8, 'dolls' ]
];

// console.log(children);

for (let i = 0; i < children.length; i++) {
  const message = `${children[i][0]} is ${children[i][1]} and they like ${children[i][2]}!`
  console.log(message);
}

// console.log(children[0], ages[0], toys[0]);
// console.log(children[1], ages[1], toys[1]);
// console.log(children[2], ages[2], toys[2]);
