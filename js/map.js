'use strict';

//  Этот модуль управляет карточками объявлений и пинами:
//  добавляет на страницу нужную карточку,
//  отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

(function () {

  function createFragment(arr) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.pin.renderPin(arr[i]));
    }

    mapPinsList.appendChild(fragment);
  }

  window.map = {
    createFragment: createFragment
  };
})();
