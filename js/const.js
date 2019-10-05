'use strict';

//  В этом файле хранятся константы

(function () {
  var NUMBER_PINS = 8;
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

  window.const = {
    NUMBER_PINS: NUMBER_PINS,
    TYPE: TYPE,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    CHECKIN: CHECKIN,
    CHECKOUT: CHECKOUT,
    FEATURES: FEATURES,
    AVATAR_WIDTH: AVATAR_WIDTH,
    AVATAR_HEIGHT: AVATAR_HEIGHT,
    MAINPIN_WIDTH: MAINPIN_WIDTH,
    MAINPIN_HEIGHT: MAINPIN_HEIGHT,
    PHOTOS: PHOTOS,
    ENTER_KEYCODE: ENTER_KEYCODE,
    TITLE_MINLENGTH: TITLE_MINLENGTH,
    TITLE_MAXLENGTH: TITLE_MAXLENGTH,
    MAXPRICE: MAXPRICE,
    PRICE_PLACEHOLDER: PRICE_PLACEHOLDER,
    BUNGALO_PRICE: BUNGALO_PRICE,
    FLAT_PRICE: FLAT_PRICE,
    HOUSE_PRICE: HOUSE_PRICE,
    PALACE_PRICE: PALACE_PRICE
  };
})();
