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
var IMAGE_OFFSET_X = 20;
var IMAGE_OFSSET_Y = 65;
var HOME_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOME_TYPES = ['flat', 'house', 'bungalo'];
var TIME_CHECKS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ESC_CODE = 27;


var generateRandomNumber = function (min, max)	{
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var convertOfferTypeToText = function (offertType) {
  switch (offertType) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    default:
      return 'Нет такого значения';
  }
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

var renderPin = function (order, template) {
  var pinElement = template.cloneNode(true);
  pinElement.style.left = (order.location.x - IMAGE_OFFSET_X) + 'px';
  pinElement.style.top = (order.location.y - IMAGE_OFSSET_Y) + 'px';
  pinElement.querySelector('img').src = order.author.avatar;
  return pinElement;
};

var renderOrder = function (order, template) {
  var orderElement = template.cloneNode(true);
  orderElement.querySelector('h3').textContent = order.offer.title;
  orderElement.querySelector('p small').textContent = order.offer.address;
  orderElement.querySelector('.popup__price').innerHTML = order.offer.price + ' &#x20bd;/ночь';
  orderElement.querySelector('h4').textContent = convertOfferTypeToText(order.offer.type);
  orderElement.querySelectorAll('p')[2].textContent = order.offer.rooms + ' комнат для ' + order.offer.guests + ' гостей';
  orderElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + order.offer.checkin + ', выезд до ' + order.offer.checkout;

  var listFeatures = orderElement.querySelector('ul.popup__features');
  var ItemListFeature = orderElement.querySelector('li');

  while (listFeatures.firstChild) {
    listFeatures.removeChild(listFeatures.firstChild);
  }
  var templateFeature;
  for (i = 0; i < order.offer.features.length; i++) {
    templateFeature = ItemListFeature.cloneNode();
    templateFeature.className = 'feature feature--' + order.offer.features[i];
    listFeatures.appendChild(templateFeature);
  }

  orderElement.querySelectorAll('p')[4].textContent = order.offer.description;
  return orderElement;
};

var disableFormElements = function () {
  for (var i = 0; i < orderFormElements.length; i++) {
    orderFormElements[i].setAttribute('disabled', 'disabled');
  }
};

var enableFormElements = function () {
  for (var i = 0; i < orderFormElements.length; i++) {
    orderFormElements[i].removeAttribute('disabled', 'disabled');
  }
  hiddenFormElement.classList.remove('notice__form--disabled');
};

var resetPin = function (element) {
  element.classList.remove('map__pin--active');
};

var resetPins = function () {
  usersPinElement.forEach(resetPin);
};

var activatePin = function (element) {
  element.classList.add('map__pin--active');
};

var onEscapePress = function (el) {
  return function (evt) {
    if (evt.keyCode === ESC_CODE) {
      resetPins();
      mapElement.removeChild(el);
    }
  };
};

var createPopup = function (order) {
  var orderElement = renderOrder(order, templateOrderElement);
  var popupClose = orderElement.querySelector('.popup__close');
  var callback = onEscapePress(orderElement);
  var onClick = function () {
    resetPins();
    popupClose.removeEventListener('click', onClick);
    document.removeEventListener('keydown', callback);
    mapElement.removeChild(orderElement);
  };

  mapElement.insertBefore(orderElement, filterContainerElement);

  popupClose.addEventListener('click', onClick);
  document.addEventListener('keydown', callback);
};

var onPinElementClick = function (order) {
  return function (event) {
    var tagName = event.target.tagName.toLowerCase();
    var popup = mapElement.querySelector('.popup');

    event.preventDefault();
    resetPins();

    if (tagName === 'button') {
      activatePin(event.target);
    } if (tagName === 'img') {
      activatePin(event.target.parentNode);
    }

    if (popup) {
      mapElement.removeChild(popup);
    }

    createPopup(order);
  };
};

var onMainPinMouseup = function () {
  mapElement.classList.remove('map--faded');
  mapPinsElement.appendChild(pinsFragment);
  usersPinElement = document.querySelectorAll('.map__pin');
  enableFormElements();
  pinMainElement.removeEventListener('mouseup', onMainPinMouseup);
};


var pinElement;
var usersPinElement;
var i = 0;
var orders = [];
var pinsFragment = document.createDocumentFragment();
var hiddenFormElement = document.querySelector('.notice__form--disabled');
var orderFormElements = document.querySelector('.notice__form').querySelectorAll('fieldset');
var templateContent = document.querySelector('template').content;
var templatePinElements = templateContent.querySelector('button.map__pin');
var templateOrderElement = templateContent.querySelector('article.map__card');
var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var pinMainElement = document.querySelector('button.map__pin--main');
var filterContainerElement = document.querySelector('.map__filters-container');


disableFormElements();

for (i = 0; i < ORDER_LIMIT; i++) {
  orders.push(generateOrder(i));
}
for (i = 0; i < orders.length; i++) {
  pinElement = renderPin(orders[i], templatePinElements);
  pinElement.addEventListener('click', onPinElementClick(orders[i]), false);
  pinsFragment.appendChild(pinElement);
}

pinMainElement.addEventListener('mouseup', onMainPinMouseup);
