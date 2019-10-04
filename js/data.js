'use strict';

// Этот файл отвечает за создание массива с данными

(function () {
  function createPins(count) {
    var pins = [];

    var map = document.querySelector('.map');
    var mapOffsetWidth = map.offsetWidth;
    var getRandomInRange = window.util.getRandomInRange;
    var getRandomValue = window.util.getRandomValue;
    var shuffleArray = window.util.shuffleArray;
    var constant = window.const;

    for (var i = 1; i <= count; i++) {
      var price = getRandomInRange(1, 100000);
      var type = getRandomValue(constant.TYPE);
      var rooms = getRandomValue(constant.ROOMS);
      var guests = getRandomValue(constant.GUESTS);
      var checkin = getRandomValue(constant.CHECKIN);
      var checkout = getRandomValue(constant.CHECKOUT);
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
          'type': constant.TYPE[type],
          'rooms': constant.ROOMS[rooms],
          'guests': constant.GUESTS[guests],
          'checkin': constant.CHECKIN[checkin],
          'checkout': constant.CHECKOUT[checkout],
          'features': shuffleArray(constant.FEATURES).slice([getRandomInRange(0, 6)]),
          'description': 'строка с тестовым описанием предложения',
          'photos': shuffleArray(constant.PHOTOS).slice([getRandomInRange(0, 3)])
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
