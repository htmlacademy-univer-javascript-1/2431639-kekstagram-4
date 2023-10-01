function isValidLength (input, maxLength) {
  return input.length <= maxLength;
}

function isPalindrome (input) {
  const editedInput = input.replaceAll(' ','').toLowerCase();
  for (let i = 0; i < editedInput.length / 2; i++) {
    if (editedInput[i] !== editedInput[editedInput.length - i - 1]) {
      return false;
    }
  }
  return true;
}

function getNumber (input) {
  const editedInput = input.toString();
  let result = '';
  for (let i = 0; i < editedInput.length; i++){
    if (!isNaN(editedInput[i])) {
      result += editedInput[i];
    }
  }
  return Number.parseInt(result, 10);
}

// console.log(isValidLength('проверяемая строка', 10));
// console.log(isPalindrome('Лёша на полке клопа нашёл '));
// console.log(getNumber('000sd123.23'));
