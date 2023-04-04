import { getRandomInteger, getRandomArrayElement } from './utils.js';

const MAX_AVATAR_ID = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 20;
const DESCRIPTIONS = [
  'Это я в Париже',
  'Это я с Мамой',
  'Это я с Папой',
  'Это я дома',
  'Это я на работе',
  'Это я на дискотеке',
  'Это я в Лондоне',
  'Это я на тренировке',
  'Это я в кино',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Маша',
  'Саша',
  'Петя',
  'Света',
  'Миша',
  'Гриша',
  'Антон',
  'Надя',
  'Василий',
];

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(COMMENTS)).join(' ');

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${ getRandomInteger(1, MAX_AVATAR_ID) }.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(0, MAX_COMMENTS) }, (_, commentIndex) =>
    createComment (commentIndex + 1)),
});

export const createPhotosList = (count) =>
  Array.from({ length: count }, (_, fotoIndex) => createPhoto(fotoIndex + 1));
