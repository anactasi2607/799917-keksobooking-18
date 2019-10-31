'use strict';

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
          'middle': dataElem.offer.price >= PRICE_LIMIT.low && dataElem.offer.price <= PRICE_LIMIT.high,
          'low': dataElem.offer.price <= PRICE_LIMIT.low,
          'high': dataElem.offer.price >= PRICE_LIMIT.high
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

    if (filterSelects.length) {
      window.map.createFragment(filterData);
    }

    function toggleCard(evt) {
      var data = evt.target.dataset.id;
      if (!data) {
        return;
      } else {
        if (filterData.length) {
          window.map.createFragmentCard(filterData, data);
          window.form.setPinClass();
          var mapPin = evt.target;
          mapPin.classList.add('map__pin--active');
        }
      }
    }

    var map = document.querySelector('.map');

    map.addEventListener('click', toggleCard);
  }

  window.filter = {
    updatePins: updatePins
  };
})();
