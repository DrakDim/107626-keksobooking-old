'use strict';

/**
 * Константы
 */

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 100;
var LOCATION_Y_MAX = 500;

/**
 * Исходные значения
 */

var titles = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var types = ['flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/**
 * Промежуточные вычисления
 */

var getRandomInt = function (min, max)	{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getFeatures = function () {
  var anyNum = Math.floor(Math.random() * 10);
  var anyArrs = [];
  for (var i = 0; i < anyNum; i++) {
    anyArrs[i] = features[getRandomInt(0, features.length - 1)];
  }
  return anyArrs;
};

/**
 * Основной объект
 */

var anyObject = function () {
  var locations = {
    x: getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX),
    y: getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX)
  };
  var location = locations.x + ', ' + location.y;
  return {
    author: {
      avatar: 'img/avatars/user0' + 'цифры от 1 до 8 повторятся не должны' + '.png'
    },
    offer: {
      title: 'заголовки повторяться не должны',
      addres: location,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: types[getRandomInt(0, 2)],
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 100),
      checkin: checks[getRandomInt(0, 2)],
      checkout: checks[getRandomInt(0, 2)],
      features: getFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: locations.x,
      y: locations.y
    }
  };
};
