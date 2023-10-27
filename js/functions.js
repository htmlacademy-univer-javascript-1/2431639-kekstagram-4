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

function isWithinSchedule (workdayStart, workDayFinish, startTime, durationMinutes) {
  const redactedWorkdayStart = workdayStart.split(':').reduce((accumulator, currentValue, index, array) =>
    accumulator + Number(currentValue) * Math.pow(60, array.length - index - 1), 0);
  const redactedWorkdayFinish = workDayFinish.split(':').reduce((accumulator, currentValue, index, array) =>
    accumulator + Number(currentValue) * Math.pow(60, array.length - index - 1), 0);
  const redactedStartTime = startTime.split(':').reduce((accumulator, currentValue, index, array) =>
    accumulator + Number(currentValue) * Math.pow(60, array.length - index - 1), 0);

  return redactedStartTime >= redactedWorkdayStart && redactedStartTime + durationMinutes <= redactedWorkdayFinish;
}

isValidLength('проверяемая строка', 10);
isPalindrome('Лёша на полке клопа нашёл ');
getNumber('000sd123.23');
isWithinSchedule('8:00', '17:30', '08:00', 900);
