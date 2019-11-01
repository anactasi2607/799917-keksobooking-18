'use strict';

//  Этот модуль отвечает за активацию формы и валидацию

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var constant = window.const;
  var pins = [];

  function addDisabled(formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', '');
    }
  }

  function removeDisabled(formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
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

  function deactivatePage() {
    adForm.classList.add('ad-form--disabled');
    addDisabled(formFieldset);
    addDisabled(mapFormSelect);
    addDisabled(mapFormFieldset);
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
    var mapPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (mapPins[i].classList.contains('map__pin--active')) {
        mapPins[i].classList.remove('map__pin--active');
      }
    }
  }

  function toggleCard(evt) {
    var pinsArr = window.filter.updatePins(pins);

    var data = evt.target.dataset.id;
    if (!data) {
      return;
    } else {
      window.map.createFragmentCard(pinsArr, data);
      setPinClass();
      var mapPin = evt.target;
      mapPin.classList.add('map__pin--active');
    }
  }

  map.addEventListener('click', toggleCard);

  function onMapFiltersChange() {
    window.map.removePins();
    window.card.closePopup();
    window.map.createFragment(window.filter.updatePins(pins));
  }

  mapForm.addEventListener('change', window.debounce(onMapFiltersChange));

  var titleInput = adForm.querySelector('#title');

  titleInput.setAttribute('minlength', constant.TITLE_MIN_LENGTH);
  titleInput.setAttribute('maxlength', constant.TITLE_MAX_LENGTH);
  titleInput.setAttribute('required', '');

  var priceInput = adForm.querySelector('#price');

  priceInput.setAttribute('max', constant.MAX_PRICE);
  priceInput.setAttribute('required', '');
  priceInput.setAttribute('placeholder', constant.PRICE_PLACEHOLDER);

  var typeInput = adForm.querySelector('#type');

  typeInput.addEventListener('change', function () {
    if (typeInput.value === 'bungalo') {
      priceInput.setAttribute('min', constant.BUNGALO_PRICE);
      priceInput.setAttribute('placeholder', constant.BUNGALO_PRICE);
    } else if (typeInput.value === 'flat') {
      priceInput.setAttribute('min', constant.FLAT_PRICE);
      priceInput.setAttribute('placeholder', constant.FLAT_PRICE);
    } else if (typeInput.value === 'house') {
      priceInput.setAttribute('min', constant.HOUSE_PRICE);
      priceInput.setAttribute('placeholder', constant.HOUSE_PRICE);
    } else if (typeInput.value === 'palace') {
      priceInput.setAttribute('min', constant.PALACE_PRICE);
      priceInput.setAttribute('placeholder', constant.PALACE_PRICE);
    }
  });

  function toggleTime(evt) {
    var id = evt.target.id;
    var timeIn = adForm.querySelector('#timein');
    var timeOut = adForm.querySelector('#timeout');

    if (id === 'timein') {
      timeOut.value = timeIn.value;
    } if (id === 'timeout') {
      timeIn.value = timeOut.value;
    }
  }

  var timeFieldset = adForm.querySelector('.ad-form__element--time');

  timeFieldset.addEventListener('change', toggleTime);

  var roomsSelect = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = adForm.querySelectorAll('#capacity option');

  function setAllOptions() {
    for (var i = 0; i < capacityOptions.length; i++) {
      if (capacity.options[i].hasAttribute('disabled')) {
        capacity.options[i].removeAttribute('disabled');
      }
      if (capacity.options[i].hasAttribute('selected')) {
        capacity.options[i].removeAttribute('selected');
      }
    }
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

  window.form = {
    setPinClass: setPinClass,
    pins: pins
  };
})();
