var allArguments = process.argv;
var justTheNumbers = allArguments.slice(2);

function sumNumbers(numbers) {
	var sum = 0

	for (var i = 0; i < numbers.length; i++) {
		var numberString = numbers[i]

		var number = Number(numberString)

		sum = sum + number
	}

	return sum
}

var sum = sumNumbers(justTheNumbers)

console.log(sum)

var sum_2 = sumNumbers(['4', '6', '25'])

console.log(sum_2)





