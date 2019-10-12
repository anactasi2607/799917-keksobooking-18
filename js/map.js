'use strict';

//  Этот модуль управляет карточками объявлений и пинами:
//  добавляет на страницу нужную карточку,
//  отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

(function () {

  function createFragment(arrData) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrData.length; i++) {
      fragment.appendChild(window.pin.renderPin(arrData[i]));
    }

    mapPinsList.appendChild(fragment);
  }

  function createFragmentCard(arrData) {
    var map = document.querySelector('.map');
    var filterContainer = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrData.length; i++) {
      fragment.appendChild(window.card.renderCard(arrData[i]));
    }

    map.insertBefore(fragment, filterContainer);
  }

  window.map = {
    createFragment: createFragment,
    createFragmentCard: createFragmentCard
  };
})();
