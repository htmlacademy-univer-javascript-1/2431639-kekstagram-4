function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomArrayElement (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

export {getRandomArrayElement, getRandomNumber, createRandomIdFromRangeGenerator};
