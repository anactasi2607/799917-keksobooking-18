'use strict';

//  Этот модуль отвечает за активацию формы и валидацию

(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var PRICE_PLACEHOLDER = 1000;
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var constant = window.const;
  var pins = [];

  function addDisabled(formElements) {
    formElements.forEach(function (elem) {
      elem.setAttribute('disabled', '');
    });
  }

  function removeDisabled(formElements) {
    formElements.forEach(function (elem) {
      elem.disabled = false;
    });
  }

  var mapForm = document.querySelector('.map__filters');
  var mapFormSelect = mapForm.querySelectorAll('select');
  var mapFormFieldset = mapForm.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  function setAdressAttribute() {
    var adressInput = adForm.querySelector('#address');

    adressInput.setAttribute('value', (mapPinMain.offsetLeft + constant.MAINPIN_WIDTH / 2) + ', ' + (mapPinMain.offsetTop + constant.MAINPIN_HEIGHT));
    adressInput.setAttribute('readonly', '');
  }

  setAdressAttribute();

  var priceInput = adForm.querySelector('#price');

  function setDefultPriceAttrubute() {
    priceInput.setAttribute('max', MAX_PRICE);
    priceInput.setAttribute('required', '');
    priceInput.setAttribute('placeholder', PRICE_PLACEHOLDER);
  }

  function deactivatePage() {
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    addDisabled(formFieldset);
    addDisabled(mapFormSelect);
    addDisabled(mapFormFieldset);
    setDefultPriceAttrubute();
  }

  deactivatePage();

  function successHandler(data) {
    pins = data;
    window.map.createFragment(pins);
  }

  function activatePage() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeDisabled(formFieldset);
    removeDisabled(mapFormSelect);
    removeDisabled(mapFormFieldset);
    window.backend.load(successHandler, window.backend.errorHandler);
    activateRoomsInput();
    setAdressAttribute();
    mapPinMain.removeEventListener('mousedown', activatePage);
    mapPinMain.removeEventListener('keydown', activatePageKeyDown);
  }

  mapPinMain.addEventListener('mousedown', activatePage);

  function activatePageKeyDown(evt) {
    evt.preventDefault();
    if (evt.keyCode === constant.ENTER_KEYCODE) {
      activatePage();
    }
  }

  mapPinMain.addEventListener('keydown', activatePageKeyDown);

  function setPinClass() {
    var mapPinsActive = document.querySelectorAll('.map__pin--active');

    mapPinsActive.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  }

  var mapPins = document.querySelector('.map__pins');

  mapPins.addEventListener('click', function (evt) {
    var pinsArr = window.filter.updatePins(pins);
    var target = evt.target.closest('button');

    if (target && target.dataset.id !== undefined) {
      setPinClass();
      target.classList.add('map__pin--active');
      window.map.createFragmentCard(pinsArr, target.dataset.id);
    }
  });

  function onMapFiltersChange() {
    window.map.removePins();
    window.card.closePopup();
    window.map.createFragment(window.filter.updatePins(pins));
  }

  mapForm.addEventListener('change', window.debounce(onMapFiltersChange));

  var titleInput = adForm.querySelector('#title');

  titleInput.setAttribute('minlength', TITLE_MIN_LENGTH);
  titleInput.setAttribute('maxlength', TITLE_MAX_LENGTH);
  titleInput.setAttribute('required', '');

  var MinPrices = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var typeInput = adForm.querySelector('#type');

  function setMinPrice() {
    var minPrice = MinPrices[typeInput.value];

    priceInput.setAttribute('min', minPrice);
    priceInput.setAttribute('placeholder', minPrice);
  }

  typeInput.addEventListener('change', setMinPrice);

  function toggleTime(evt) {
    var timeIn = adForm.querySelector('#timein');
    var timeOut = adForm.querySelector('#timeout');

    switch (evt.target.name) {
      case 'timein':
        timeOut.value = evt.target.value;
        break;
      case 'timeout':
        timeIn.value = evt.target.value;
        break;
    }
  }

  var timeFieldset = adForm.querySelector('.ad-form__element--time');
  timeFieldset.addEventListener('change', toggleTime);

  var roomsSelect = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = adForm.querySelectorAll('#capacity option');

  function setAllOptions() {
    capacityOptions.forEach(function (elem) {
      if (elem.hasAttribute('disabled')) {
        elem.removeAttribute('disabled');
      }
      if (elem.hasAttribute('selected')) {
        elem.removeAttribute('selected');
      }
    });
  }

  function activateRoomsInput() {
    setAllOptions();
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[3].disabled = true;
    capacity.options[2].selected = true;
  }

  function syncRoomsGuests() {
    setAllOptions();
    switch (roomsSelect.value) {
      case '1':
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[3].disabled = true;
        capacity.options[2].selected = true;
        break;
      case '2':
        capacity.options[0].disabled = true;
        capacity.options[3].disabled = true;
        capacity.options[2].selected = true;
        break;
      case '3':
        capacity.options[3].disabled = true;
        capacity.options[2].selected = true;
        break;
      case '100':
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[2].disabled = true;
        capacity.options[3].selected = true;
        break;
    }
  }

  roomsSelect.addEventListener('change', syncRoomsGuests);

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), window.backend.saveSuccessHandler, window.backend.errorHandler);
    evt.preventDefault();
  });

  function returnPageToDefault() {
    window.map.removePins();
    window.card.closePopup();
    adForm.reset();
    mapForm.reset();
    window.mainPin.returnPinToDefault();
    window.uploadPhoto.deleteFormImage();
  }

  var resetForm = adForm.querySelector('.ad-form__reset');

  function resetClickHandler() {
    returnPageToDefault();
    deactivatePage();
    mapPinMain.addEventListener('mousedown', activatePage);
    mapPinMain.removeEventListener('keydown', activatePageKeyDown);
  }

  resetForm.addEventListener('click', resetClickHandler);

  window.form = {
    setPinClass: setPinClass,
    pins: pins,
    returnPageToDefault: returnPageToDefault,
    deactivatePage: deactivatePage,
    activatePage: activatePage,
    activatePageKeyDown: activatePageKeyDown
  };
})();
