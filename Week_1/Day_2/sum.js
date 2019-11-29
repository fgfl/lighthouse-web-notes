var allArguments = process.argv;
var justTheNumbers = allArguments.slice(2);

// console log all of the arguments!

// console.log('PROCESS ARGV:', allArguments)

// only want everything but the first two. How do I do this?

// console.log('SLICED!', justTheNumbers)

var sum = 0

// some kind of for loop to go through the numbers and add them

for (var i = 0; i < justTheNumbers.length; i++) {
	var numberString = justTheNumbers[i]
	// turn that number which is a string into an actual number

	var number = Number(numberString)

	debugger

	sum = sum + number

	// console.log('type of number', typeof number)

	// console.log(number)
}

console.log(sum)



