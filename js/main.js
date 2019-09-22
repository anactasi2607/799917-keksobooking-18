'use strict';

var AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
var GUESTS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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

  var avatar = getRandomValue(AVATAR);
  var price = getRandomInRange(1, 100000);
  var type = getRandomValue(TYPE);
  var rooms = getRandomValue(ROOMS);
  var guests = getRandomValue(GUESTS);
  var checkin = getRandomValue(CHECKIN);
  var checkout = getRandomValue(CHECKOUT);
  var map = document.querySelector('.map');
  var mapOffsetWidth = map.offsetWidth;
  var locationX = getRandomInRange(0, mapOffsetWidth);
  var locationY = getRandomInRange(130, 630);

  for (var i = 0; i < count; i++) {
    pins[i] = {
      'author': {
        'avatar': AVATAR[avatar]
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
    };
  }

  return pins;

};

createPins(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');
