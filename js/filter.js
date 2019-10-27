'use strict';

(function () {

  var mapForm = document.querySelector('.map__filters');

  function updatePins(dataPin) {
    var filterData = dataPin.slice();

    var filterSelects = mapForm.querySelectorAll('select');

    var FilterRules = {
      'housing-type': 'type'
    };

    function filterByValue(select, property) {
      return filterData.filter(function (dataElem) {
        return dataElem.offer[property].toString() === select.value;
      });
    }

    if (filterSelects.length !== null) {
      filterSelects.forEach(function (item) {
        if (item.value !== 'any') {
          filterData = filterByValue(item, FilterRules[item.id]);
        }
      });
    }

    if (filterSelects.length) {
      window.map.createFragment(filterData);
    }
  }

  window.filter = {
    updatePins: updatePins
  };
})();
