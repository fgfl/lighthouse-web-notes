// If Functions are values, they can be passed around, then?

const f = function() {
  return 6;
};

const anotherFunc = function(func) {
  console.log(func);
};

anotherFunc(f);