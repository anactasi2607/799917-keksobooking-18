'use strict';

// Этот файл отвечает за создание массива с данными

(function () {
  function createPins(count) {
    var pins = [];

    var map = document.querySelector('.map');
    var mapOffsetWidth = map.offsetWidth;


    for (var i = 1; i <= count; i++) {
      var price = window.util.getRandomInRange(1, 100000);
      var type = window.util.getRandomValue(window.const.TYPE);
      var rooms = window.util.getRandomValue(window.const.ROOMS);
      var guests = window.util.getRandomValue(window.const.GUESTS);
      var checkin = window.util.getRandomValue(window.const.CHECKIN);
      var checkout = window.util.getRandomValue(window.const.CHECKOUT);
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
          'type': window.const.TYPE[type],
          'rooms': window.const.ROOMS[rooms],
          'guests': window.const.GUESTS[guests],
          'checkin': window.const.CHECKIN[checkin],
          'checkout': window.const.CHECKOUT[checkout],
          'features': window.util.shuffleArray(window.const.FEATURES).slice([window.util.getRandomInRange(0, 6)]),
          'description': 'строка с тестовым описанием предложения',
          'photos': window.util.shuffleArray(window.const.PHOTOS).slice([window.util.getRandomInRange(0, 3)])
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      });
    }

    return pins;
  }

  window.data = {
    createPins: createPins
  };

})();
