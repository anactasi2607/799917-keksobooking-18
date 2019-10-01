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
var ENTER_KEYCODE = 13;
var TITLE_MINLENGTH = 30;
var TITLE_MAXLENGTH = 100;
var MAXPRICE = 1000000;
var PRICE_PLACEHOLDER = 1000;
var BUNGALO_PRICE = 0;
var FLAT_PRICE = 1000;
var HOUSE_PRICE = 5000;
var PALACE_PRICE = 10000;

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

var setAdressAttribute = function () {
  var adressInput = adForm.querySelector('#address');

  adressInput.setAttribute('value', (mapPinMain.offsetLeft + MAINPIN_WIDTH / 2) + ', ' + (mapPinMain.offsetTop + MAINPIN_HEIGHT));
  adressInput.setAttribute('readonly', '');
};

setAdressAttribute();

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
  activateRoomsInput();
  setAdressAttribute();
};

mapPinMain.addEventListener('mousedown', function () {
  activatePage();
});

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

var titleInput = adForm.querySelector('#title');

titleInput.setAttribute('minlength', TITLE_MINLENGTH);
titleInput.setAttribute('maxlength', TITLE_MAXLENGTH);
titleInput.setAttribute('required', '');

var priceInput = adForm.querySelector('#price');

priceInput.setAttribute('max', MAXPRICE);
priceInput.setAttribute('required', '');
priceInput.setAttribute('placeholder', PRICE_PLACEHOLDER);

var typeInput = adForm.querySelector('#type');

typeInput.addEventListener('change', function () {
  if (typeInput.value === 'bungalo') {
    priceInput.setAttribute('min', BUNGALO_PRICE);
    priceInput.setAttribute('placeholder', BUNGALO_PRICE);
  } else if (typeInput.value === 'flat') {
    priceInput.setAttribute('min', FLAT_PRICE);
    priceInput.setAttribute('placeholder', FLAT_PRICE);
  } else if (typeInput.value === 'house') {
    priceInput.setAttribute('min', HOUSE_PRICE);
    priceInput.setAttribute('placeholder', HOUSE_PRICE);
  } else if (typeInput.value === 'palace') {
    priceInput.setAttribute('min', PALACE_PRICE);
    priceInput.setAttribute('placeholder', PALACE_PRICE);
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
var capacityOptions = adForm.querySelectorAll('#capacity option');

function setAllOptions() {
  for (var i = 0; i < capacityOptions.length; i++) {
    if (capacity.options[i].hasAttribute('disabled')) {
      capacity.options[i].removeAttribute('disabled');
    }
    if (capacity.options[i].hasAttribute('selected')) {
      capacity.options[i].removeAttribute('selected');
    }
  }
}

function activateRoomsInput() {
  setAllOptions();
  capacity.options[0].disabled = true;
  capacity.options[1].disabled = true;
  capacity.options[3].disabled = true;
  capacity.options[2].selected = true;
}

function syncRoomsGuests() {
  setAllOptions();
  switch (roomsSelect.value) {
    case '1':
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[3].disabled = true;
      capacity.options[2].selected = true;
      break;
    case '2':
      capacity.options[0].disabled = true;
      capacity.options[3].disabled = true;
      capacity.options[2].selected = true;
      break;
    case '3':
      capacity.options[3].disabled = true;
      capacity.options[2].selected = true;
      break;
    case '100':
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = true;
      capacity.options[3].selected = true;
      break;
  }
}

roomsSelect.addEventListener('change', syncRoomsGuests);
