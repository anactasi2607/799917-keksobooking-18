'use strict';
// Этот модуль нужен для создания меток на карте

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  function renderPin(pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (pin.location.x - window.const.AVATAR_WIDTH / 2) + 'px';
    pinElement.style.top = (pin.location.y - window.const.AVATAR_HEIGHT) + 'px';

    var pinImgElement = pinElement.querySelector('img');

    pinImgElement.src = pin.author.avatar;
    pinImgElement.alt = pin.offer.title;

    return pinElement;
  }

  window.pin = {
    renderPin: renderPin
  };
})();
