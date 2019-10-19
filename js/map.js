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
      fragment.appendChild(item);
    }

    mapPinsList.appendChild(fragment);
  }

  var map = document.querySelector('.map');

  function createFragmentCard(arrData) {
    var filterContainer = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();

    // for (var i = 0; i < arrData.length; i++) {
    var item = window.card.renderCard(arrData[0]);
    // item.id = 'item' + [i];
    fragment.appendChild(item);
    // }

    map.insertBefore(fragment, filterContainer);
  }

  /*  function toggleCard(event) {
    var data = event.target.dataset.id;
    if (!data) {
      return;
    } else {
      var elem = document.getElementById(data);

      elem.hidden = !elem.hidden;
    }
  }*/

  // document.addEventListener('click', toggleCard);

  window.map = {
    createFragment: createFragment,
    createFragmentCard: createFragmentCard
  };
})();
