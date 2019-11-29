/*
 * OBJECTS CHALLENGE: (Elite) Leet Speak
 * Implement a simple cipher which takes in an array of letters and returns
 * a 1337 (leet) version of the array of letters
 */

const leetMappings = {
  'h': '4',
  'e': '3',
  'l': '1',
  'o': '0'
};

let leetSpeek = function(characters) {
  // return ['4', '3', '1', '1', '0'];
  // console.log(characters);
  const leetCharacters = [];

  // Using a simpler version of the loop below
  // for(let i = 0; i < characters.length; i++) {
  //   const char = characters[i];
  // }

  for (const char of characters) {
    let leetChar = char;
    // if (char === 'h') {
    //   leetChar = '4';
    // } else if (char === 'e') {
    //   leetChar = '3';
    // }
    leetChar = leetMappings[char] ? leetMappings[char] : char; // <= must use [square brackets] here since it's a var
    leetCharacters.push(leetChar);
    // console.log(char, ' => ', leetChar);
  }
  return leetCharacters;
};

console.log(leetSpeek(['h', 'e', 'l', 'l', 'o']));

