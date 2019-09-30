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
var MAINPIN_WIDTH = 62;
var MAINPIN_HEIGHT = 84;
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

var ENTER_KEYCODE = 13;
var adForm = document.querySelector('.ad-form');
var formFieldset = adForm.querySelectorAll('fieldset');

var addDisabled = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', '');
  }
};

var removeDisabled = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = false;
  }
};

var mapForm = document.querySelector('.map__filters');
var mapFormSelect = mapForm.querySelectorAll('select');
var mapFormFieldset = mapForm.querySelectorAll('fieldset');
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var adressInput = adForm.querySelector('#address');

var mapLocationX = mapPinMain.style.left.replace('px', '');
var mapLocationY = mapPinMain.style.left.replace('px', '');
adressInput.setAttribute('value', (+mapLocationX + MAINPIN_WIDTH / 2) + ', ' + (+mapLocationY + MAINPIN_HEIGHT));
adressInput.setAttribute('readonly', '');

var deactivatePage = function () {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('ad-form--disabled');
  addDisabled(formFieldset);
  addDisabled(mapFormSelect);
  addDisabled(mapFormFieldset);
};

deactivatePage();

var activatePage = function () {
  map.classList.remove('map--faded');
  mapForm.classList.remove('ad-form--disabled');
  adForm.classList.remove('ad-form--disabled');
  removeDisabled(formFieldset);
  removeDisabled(mapFormSelect);
  removeDisabled(mapFormFieldset);
  var pins = createPins(numberPins);
  createFragment(pins);
  adressInput.setAttribute('value', (+mapLocationX + MAINPIN_WIDTH / 2) + ', ' + (+mapLocationY + MAINPIN_HEIGHT));
};

mapPinMain.addEventListener('mousedown', function () {
  activatePage();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

var titleInput = adForm.querySelector('#title');

titleInput.setAttribute('minlength', '30');
titleInput.setAttribute('maxlength', '100');
titleInput.setAttribute('required', '');

var priceInput = adForm.querySelector('#price');

priceInput.setAttribute('max', '1 000 000');
priceInput.setAttribute('required', '');
priceInput.setAttribute('placeholder', '1000');

var typeInput = adForm.querySelector('#type');

typeInput.addEventListener('change', function (evt) {
  if (typeInput.value === 'bungalo') {
    priceInput.setAttribute('min', '0');
    priceInput.setAttribute('placeholder', '0');
  } else if (typeInput.value === 'flat') {
    priceInput.setAttribute('min', '1000');
    priceInput.setAttribute('placeholder', '1000');
  } else if (typeInput.value === 'house') {
    priceInput.setAttribute('min', '5000');
    priceInput.setAttribute('placeholder', '5000');
  } else if (typeInput.value === 'palace') {
    priceInput.setAttribute('min', '10000');
    priceInput.setAttribute('placeholder', '10000');
  }
});

var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});

timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

var roomsSelect = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var guest0 = capacity.querySelector('option:last-child');
var guest1 = capacity.querySelector('option:nth-child(3)');
var guest2 = capacity.querySelector('option:nth-child(2)');
var guest3 = capacity.querySelector('option:first-child');
guest3.removeAttribute('selected');
guest1.setAttribute('selected', '');
capacity.innerHTML = '';
capacity.appendChild(guest1);

roomsSelect.addEventListener('change', function (evt) {
  if (roomsSelect.value === '1') {
    capacity.innerHTML = '';
    capacity.appendChild(guest1);
  } else if (roomsSelect.value === '2') {
    capacity.innerHTML = '';
    capacity.appendChild(guest1);
    capacity.appendChild(guest2);
  } else if (roomsSelect.value === '3') {
    capacity.innerHTML = '';
    capacity.appendChild(guest1);
    capacity.appendChild(guest2);
    capacity.appendChild(guest3);
  } else if (roomsSelect.value === '100') {
    capacity.innerHTML = '';
    capacity.appendChild(guest0);
  }
});
