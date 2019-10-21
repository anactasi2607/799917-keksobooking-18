'use strict';

//  Этот модуль управляет карточками объявлений и пинами:
//  добавляет на страницу нужную карточку,
//  отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

(function () {

  function createFragment(arrData) {
    var mapPinsList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrData.length; i++) {
      var item = window.pin.renderPin(arrData[i]);
      item.dataset.id = i;
      var img = item.querySelector('img');
      img.dataset.id = i;
      fragment.appendChild(item);
    }

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

  window.map = {
    createFragment: createFragment,
    createFragmentCard: createFragmentCard,
    createCardSection: createCardSection,
    divCards: divCards
  };
})();
