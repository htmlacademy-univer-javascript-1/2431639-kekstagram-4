import {getRandomArrayElement, getRandomNumber, createRandomIdFromRangeGenerator} from './util.js';

const NAMES = [
  'Бенедикт Камбербэтч',
  'Антон Шкредов',
  'Арнольд Шварценеггер',
  'Юно Майлс',
  'Мариано Арруда',
  'Джастин Моралес',
  'Зигмунд Фрейд',
  'Кристиан Бэйл',
  'Тайлер Дёрден',
  'Патрик Бэйтман',
  'Райан Гослинг',
  'Мадс Миккельсен',
  'Дженсен Эклс',
  'Майкл Джордан',
  'Кэнтаро Миура',
  'Стэнли Кубрик',
  'Эдвард Элрик',
  'Эдвард Кенуэй',
];

const SENTENCES = `Всё отлично!
В целом всё неплохо. Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`.split(/\n/g);

const DESCRIPTIONS = `Вот так вот
И такое бывает!
Что было - то прошло
Я всегда мечтал стать гигантским космическим крабом`.split(/\n/g);

const OBJECTS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;

function generateText (source) {
  return function () {
    const getSentenceId = createRandomIdFromRangeGenerator(0, source.length - 1);
    return source[getSentenceId()];
  };
}

function createObject (getIdFunction) {
  return function () {
    const idValue = getIdFunction();
    return {
      id: idValue,
      url: `photos/${idValue}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomNumber(15, 200),
      comments: Array.from({length: getRandomNumber(0, MAX_COMMENTS_COUNT)}, createComment(createRandomIdFromRangeGenerator(1, MAX_COMMENTS_COUNT))),
    };
  };
}

function createComment (getIdFunction) {
  return function () {
    return {
      id: getIdFunction(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: Array.from({length: getRandomNumber(1, 2)}, generateText(SENTENCES)),
      name: getRandomArrayElement(NAMES),
    };
  };
}

const createObjects = () => Array.from({length: OBJECTS_COUNT}, createObject(createRandomIdFromRangeGenerator(1, OBJECTS_COUNT)));
export {createObjects};
