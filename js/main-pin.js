'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');
  var mainPinCurrentX = mainPin.offsetLeft;
  var mainPinCurrentY = mainPin.offsetTop;

  function getMainPinCoordinate() {
    adressInput.value = Math.round(mainPinCurrentX + window.const.MAINPIN_WIDTH / 2) + ', ' +
    Math.round(mainPinCurrentY + window.const.MAINPIN_HEIGHT + window.const.MAINPIN_END_HEIGHT);
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinCurrentX = mainPinCurrentX - shift.x;
      mainPinCurrentY = mainPinCurrentY - shift.y;

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      getMainPinCoordinate();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
