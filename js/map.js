'use strict';

var ORDER_LIMIT = 8;

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

/* var OFSSET_PiN = 65; */

var HOME_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOME_TYPES = ['flat', 'house', 'bungalo'];
var TIME_CHECKS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var generateRandomNumber = function (min, max)	{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomFeatures = function () {
  var features = FEATURES.slice(0);
  var result = [];
  var count = generateRandomNumber(1, FEATURES.length);
  var randomIndex;
  for (var i = 0; i < count; i++) {
    randomIndex = generateRandomNumber(0, features.length - 1);
    result.push(features[randomIndex]);
    features.splice(randomIndex, 1);
  }
  return result;
};

var generateOrder = function (index) {
  var location = {
    x: generateRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
    y: generateRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: HOME_TITLES[index],
      addres: location.x + ', ' + location.y,
      price: generateRandomNumber(PRICE_MIN, PRICE_MAX),
      type: HOME_TYPES[generateRandomNumber(0, HOME_TYPES.length - 1)],
      rooms: generateRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: generateRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: TIME_CHECKS[generateRandomNumber(0, TIME_CHECKS.length - 1)],
      checkout: TIME_CHECKS[generateRandomNumber(0, TIME_CHECKS.length - 1)],
      features: generateRandomFeatures(),
      description: '',
      photos: []
    },
    location: location
  };
};

var orders = [];
for (var i = 0; i < ORDER_LIMIT; i++) {
  orders.push(generateOrder(i));
}

document.querySelector('.map').classList.remove('map--faded');

var renderPin = function (order) {
  var pinElement = document.querySelector('template').content.querySelector('button.map__pin').cloneNode(true);
  pinElement.style.left = order.location.x;
  pinElement.style.top = order.location.y;
  pinElement.querySelector('img').src = order.author.avatar;
  return pinElement;
};

var renderOrder = function (order) {
  var orderElement = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
  orderElement.querySelector('h3').textContent = order.offer.title;
  orderElement.querySelector('p small').textContent = order.offer.address;
  orderElement.querySelector('.popup__price').textContent = order.offer.price + '&#x20bd;/ночь';

  var convertOfferTypeToText = function (parametr) {
    var value;
    switch (parametr) {
      case 'flat':
        value = 'Квартира';
        break;
      case 'bungalo':
        value = 'Бунгало';
        break;
      case 'house':
        value = 'Дом';
        break;
    }
    return value;
  };
  orderElement.querySelector('h4').textContent = convertOfferTypeToText(order.offer.type);
  orderElement.querySelectorAll('p')[3].textContent = order.offer.rooms + ' для ' + order.offer.guests + ' гостей';
  orderElement.querySelectorAll('p')[4].textContent = 'Заезд после ' + order.offer.checkin + ', выезд до ' + order.offer.checkout;

  var oneFeature = orderElement.querySelector('.popup__features li').cloneNode;
  for (i = 0; i < order.offer.features.length; i++) {
    oneFeature.classList.add('feature feature--' + order.offer.features[i]);
    orderElement.appendChild(oneFeature);
  }
  orderElement.querySelectorAll('p')[5].textContent = order.offer.description;
  return orderElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < orders.length; i++) {
  fragment.appendChild(renderPin(orders[i]));
  fragment.appendChild(renderOrder(orders[i]));
}

document.querySelector('.map__pins').appendChild(fragment);
