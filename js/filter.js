'use strict';

(function () {
  var PRICE_LIMIT = {
    low: 10000,
    hight: 50000
  };

  var mapForm = document.querySelector('.map__filters');

  function updatePins(dataPin) {
    var filterData = dataPin.slice();

    var filterSelects = mapForm.querySelectorAll('select');

    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    function filterByValue(select, property) {
      return filterData.filter(function (dataElem) {
        return dataElem.offer[property].toString() === select.value;
      });
    }

    /*  function filterByPrice(priceFilter) {
      return filterData.filter(function (dataElem) {

        var priceFilterValues = {
          'middle': dataElem.offer.price >= PRICE_LIMIT.low && dataElem.offer.price <= PRICE_LIMIT.high,
          'low': dataElem.offer.price < PRICE_LIMIT.low,
          'high': dataElem.offer.price >= PRICE_LIMIT.high
        };

        return priceFilterValues[priceFilter.value];
      });
    }*/

    if (filterSelects.length !== null) {
      filterSelects.forEach(function (item) {
        if (item.value !== 'any') {
        /*  if (item.id !== 'housing-price'){*/
          filterData = filterByValue(item, FilterRules[item.id]);
        }/* else {
            filterData = filterByPrice(item);
          }
        }*/
      });
    }

    if (filterSelects.length) {
      window.map.createFragment(filterData);
    }

    function toggleCard(event) {
      var data = event.target.dataset.id;
      if (!data) {
        return;
      } else {
        window.map.createFragmentCard(filterData, data);
        window.form.setPinClass();
        var mapPin = event.target;
        mapPin.classList.add('map__pin--active');
      }
    }

    var map = document.querySelector('.map');

    map.addEventListener('click', toggleCard);
  }

  window.filter = {
    updatePins: updatePins
  };
})();
