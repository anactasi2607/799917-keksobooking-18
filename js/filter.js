'use strict';

// Этот модуль для фильтрации данных с сервера

(function () {
  var PriceLimit = {
    low: 10000,
    high: 50000
  };

  var mapForm = document.querySelector('.map__filters');

  function updatePins(dataPin) {
    var filterData = dataPin.slice();

    var filterSelects = mapForm.querySelectorAll('select');
    var featuresFilters = mapForm.querySelectorAll('input[type=checkbox]:checked');

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

    function filterByPrice(priceFilter) {
      return filterData.filter(function (dataElem) {

        var priceFilterValues = {
          'middle': dataElem.offer.price >= PriceLimit.low && dataElem.offer.price <= PriceLimit.high,
          'low': dataElem.offer.price <= PriceLimit.low,
          'high': dataElem.offer.price >= PriceLimit.high
        };

        return priceFilterValues[priceFilter.value];
      });
    }

    function filterByFeatures(item) {
      return filterData.filter(function (dataElem) {
        return dataElem.offer.features.indexOf(item.value) >= 0;
      });
    }

    if (filterSelects.length !== null) {
      filterSelects.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            filterData = filterByValue(item, FilterRules[item.id]);
          } else {
            filterData = filterByPrice(item);
          }
        }
      });
    }

    if (featuresFilters !== null) {
      featuresFilters.forEach(function (item) {
        filterData = filterByFeatures(item);
      });
    }

    return filterData;
  }

  window.filter = {
    updatePins: updatePins
  };
})();
