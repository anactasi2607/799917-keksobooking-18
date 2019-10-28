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
      console.log(filterData);
      window.map.createFragment(filterData);
    }
  }

  window.filter = {
    updatePins: updatePins
  };
})();
