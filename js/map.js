'use strict';

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 100;
var LOCATION_Y_MAX = 500;

var MAX_ROOMS = 5;
var MAX_GUESTS = 100;

var HOME_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOME_TYPES = ['flat', 'house', 'bungalo'];
var TIME_CHECKS = ['12:00', '13:00', '14:00'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getRandomInt = function (min, max)	{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateNumberImg = function () {
  /* 'цифры от 1 до 8 повторятся не должны' */
  var anyArrs = [];
  for (var i = 0; i < 8; i++) {
    anyArrs[i] = i++;
  }
  return anyArrs;
};

var generateTitles = function () {
  var oneTitle = HOME_TITLES[getRandomInt(0, HOME_TITLES.length - 1)];
  /* 'заголовки повторяться не должны' */
  return oneTitle;
};

var getRandomFacilities = function () {
  var randomNumber = getRandomInt(0, 10);
  var anyArrs = [];
  for (var i = 0; i < randomNumber; i++) {
    anyArrs[i] = FACILITIES[getRandomInt(0, FACILITIES.length - 1)];
  }
  return anyArrs;
};

var generateObjectForArray = function () {
  var locations = {
    x: getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX),
    y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
  };
  var location = locations.x + ', ' + location.y;
  return {
    author: {
      avatar: 'img/avatars/user0' + generateNumberImg() + '.png'
    },
    offer: {
      title: generateTitles(),
      addres: location,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: HOME_TYPES[getRandomInt(0, HOME_TYPES.length - 1)],
      rooms: getRandomInt(1, MAX_ROOMS),
      guests: getRandomInt(1, MAX_GUESTS),
      checkin: TIME_CHECKS[getRandomInt(0, TIME_CHECKS.length - 1)],
      checkout: TIME_CHECKS[getRandomInt(0, TIME_CHECKS.length - 1)],
      features: getRandomFacilities(),
      description: '',
      photos: []
    },
    location: {
      x: locations.x,
      y: locations.y
    }
  };
};

generateObjectForArray();
