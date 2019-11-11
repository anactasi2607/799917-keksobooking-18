'use strict';

//  Этот модуль отвечает за перемещение главного пина по карте

(function () {
  var MAINPIN_X_MIN = 0;
  var MAINPIN_Y_MIN = 130;
  var MAINPIN_Y_MAX = 630;
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinCurrentX = mainPin.offsetLeft;
  var mainPinCurrentY = mainPin.offsetTop;
  var cursorX = parseInt(mainPin.style.left, 10);
  var cursorY = parseInt(mainPin.style.top, 10);
  var constant = window.const;
  var mainPinLocationXMax = document.querySelector('.map__overlay').offsetWidth;
  var mainPinXMin = MAINPIN_X_MIN - constant.MAINPIN_WIDTH / 2;
  var mainPinXMax = mainPinLocationXMax - constant.MAINPIN_WIDTH / 2;
  var mainPinYMin = MAINPIN_Y_MIN - constant.MAINPIN_HEIGHT - constant.MAINPIN_END_HEIGHT;
  var mainPinYMax = MAINPIN_Y_MAX - constant.MAINPIN_HEIGHT - constant.MAINPIN_END_HEIGHT;
  var MAINPIN_X_DEFAULT = '570px';
  var MAINPIN_Y_DEFAULT = '375px';

  function getMainPinCoordinate() {
    var adressInput = document.querySelector('#address');

    adressInput.value = Math.round(mainPinCurrentX + constant.MAINPIN_WIDTH / 2) + ', ' +
    Math.round(mainPinCurrentY + constant.MAINPIN_HEIGHT + constant.MAINPIN_END_HEIGHT);
  }

  function returnPinToDefault() {
    mainPin.style.top = MAINPIN_Y_DEFAULT;
    mainPin.style.left = MAINPIN_X_DEFAULT;
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

      cursorX = cursorX - shift.x;
      cursorY = cursorY - shift.y;

      if (mainPinCurrentX > mainPinXMax || cursorX > mainPinXMax) {
        mainPinCurrentX = mainPinXMax;
      } else if (mainPinCurrentX < mainPinXMin || cursorX < mainPinXMin) {
        mainPinCurrentX = mainPinXMin;
      }
      if (mainPinCurrentY > mainPinYMax || cursorY > mainPinYMax) {
        mainPinCurrentY = mainPinYMax;
      } else if (mainPinCurrentY < mainPinYMin || cursorY < mainPinYMin) {
        mainPinCurrentY = mainPinYMin;
      }

      mainPin.style.top = mainPinCurrentY + 'px';
      mainPin.style.left = mainPinCurrentX + 'px';

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

  window.mainPin = {
    returnPinToDefault: returnPinToDefault
  };
})();
