'use strict';

var ORDER_OBJECT = 8;

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 100;
var LOCATION_Y_MAX = 500;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
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

var getNumberPlusCount = function (number, count) {
  number + count;
  return number;
};

var getRandomFacilities = function () {
  var cloneArr = FACILITIES.slice(0);
  var returnArr = [];
  for (var i = 0; i < FACILITIES.length; i++) {
    var randomIndex = getRandomInt(0, cloneArr.length - 1);
    returnArr[i] = cloneArr[randomIndex];
    cloneArr.splice(randomIndex, 1);
  }
  returnArr.length = returnArr.length - getRandomInt(0, FACILITIES.length - 1);
  return returnArr;
};

var numberUser = 0;
var indexHomeTitle = -1;
var generateObjectForArray = function () {
  var location = {
    x: getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX),
    y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + getNumberPlusCount(numberUser, 1) + '.png'
    },
    offer: {
      title: HOME_TITLES[getNumberPlusCount(indexHomeTitle, 1)],
      addres: location.x + ', ' + location.y,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: HOME_TYPES[getRandomInt(0, HOME_TYPES.length - 1)],
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
      checkin: TIME_CHECKS[getRandomInt(0, TIME_CHECKS.length - 1)],
      checkout: TIME_CHECKS[getRandomInt(0, TIME_CHECKS.length - 1)],
      features: getRandomFacilities(),
      description: '',
      photos: []
    },
    location: location
  };
};

var orderObjects = [];
for (var i = 0; i < ORDER_OBJECT; i++) {
  orderObjects[i].push(generateObjectForArray());
};
