'use strict';

//  Этот модуль управляет карточками объявлений и пинами:
//  добавляет на страницу нужную карточку,
//  отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

(function () {
  var NUMBER_OF_PINS = 5;
  var mapPinsList = document.querySelector('.map__pins');


  function createFragment(arrData) {
    var fragment = document.createDocumentFragment();
    var filteredArr = arrData.slice(0, NUMBER_OF_PINS);

    filteredArr.forEach(function (elem, index) {
      var item = window.pin.renderPin(elem);
      item.dataset.id = index;
      fragment.appendChild(item);
    });

    mapPinsList.appendChild(fragment);
  }

  var map = document.querySelector('.map');
  var divCards = document.createElement('div');
  var filterContainer = map.querySelector('.map__filters-container');

  function createCardSection() {
    divCards.className = 'map__cards';
    map.insertBefore(divCards, filterContainer);
  }

  createCardSection();

  function createFragmentCard(arrData, dataId) {
    divCards.innerHTML = '';
    var item = window.card.renderCard(arrData[dataId]);

    divCards.appendChild(item);
    map.insertBefore(divCards, filterContainer);
  }

  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      mapPinsList.removeChild(pin);
    });
  }

  window.map = {
    createFragment: createFragment,
    createFragmentCard: createFragmentCard,
    divCards: divCards,
    removePins: removePins
  };
})();
