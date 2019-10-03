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

var createPins = function (count) {
  var pins = [];

  var map = document.querySelector('.map');
  var mapOffsetWidth = map.offsetWidth;


  for (var i = 1; i <= count; i++) {
    var price = window.util.getRandomInRange(1, 100000);
    var type = window.util.getRandomValue(TYPE);
    var rooms = window.util.getRandomValue(ROOMS);
    var guests = window.util.getRandomValue(GUESTS);
    var checkin = window.util.getRandomValue(CHECKIN);
    var checkout = window.util.getRandomValue(CHECKOUT);
    var locationX = window.util.getRandomInRange(0, mapOffsetWidth);
    var locationY = window.util.getRandomInRange(130, 630);

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
        'features': window.util.shuffleArray(FEATURES).slice([window.util.getRandomInRange(0, 6)]),
        'description': 'строка с тестовым описанием предложения',
        'photos': window.util.shuffleArray(PHOTOS).slice([window.util.getRandomInRange(0, 3)])
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
