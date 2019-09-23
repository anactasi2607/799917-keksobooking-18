'use strict';

var numberPins = 8;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
var GUESTS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomValue = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

var createPins = function (count) {
  var pins = [];

  var map = document.querySelector('.map');
  var mapOffsetWidth = map.offsetWidth;


  for (var i = 1; i <= count; i++) {
    var price = getRandomInRange(1, 100000);
    var type = getRandomValue(TYPE);
    var rooms = getRandomValue(ROOMS);
    var guests = getRandomValue(GUESTS);
    var checkin = getRandomValue(CHECKIN);
    var checkout = getRandomValue(CHECKOUT);
    var locationX = getRandomInRange(0, mapOffsetWidth);
    var locationY = getRandomInRange(130, 630);

    pins.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': 'Тестовый заголовок предложения',
        'address': locationX + ',' + locationY,
        'price': price,
        'type': TYPE[type],
        'rooms': ROOMS[rooms],
        'guests': GUESTS[guests],
        'checkin': CHECKIN[checkin],
        'checkout': CHECKOUT[checkout],
        'features': shuffleArray(FEATURES).slice([getRandomInRange(0, 6)]),
        'description': 'строка с тестовым описанием предложения',
        'photos': shuffleArray(PHOTOS).slice([getRandomInRange(0, 3)])
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }

  return pins;

};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = (pin.location.x - AVATAR_WIDTH / 2) + 'px';
  pinElement.style.top = (pin.location.y - AVATAR_HEIGHT) + 'px';

  var pinImgElement = pinElement.querySelector('img');

  pinImgElement.src = pin.author.avatar;
  pinImgElement.alt = pin.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

var createFragment = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  mapPinsList.appendChild(fragment);
};

var pins = createPins(numberPins);

createFragment(pins);
