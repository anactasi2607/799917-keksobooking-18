'use strict';

//  Этот модуль отвечает за активацию формы и валидацию

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');

  var addDisabled = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', '');
    }
  };

  var removeDisabled = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = false;
    }
  };

  var mapForm = document.querySelector('.map__filters');
  var mapFormSelect = mapForm.querySelectorAll('select');
  var mapFormFieldset = mapForm.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var setAdressAttribute = function () {
    var adressInput = adForm.querySelector('#address');

    adressInput.setAttribute('value', (mapPinMain.offsetLeft + window.const.MAINPIN_WIDTH / 2) + ', ' + (mapPinMain.offsetTop + window.const.MAINPIN_HEIGHT));
    adressInput.setAttribute('readonly', '');
  };

  setAdressAttribute();

  var deactivatePage = function () {
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('ad-form--disabled');
    addDisabled(formFieldset);
    addDisabled(mapFormSelect);
    addDisabled(mapFormFieldset);
  };

  deactivatePage();

  var activatePage = function () {
    map.classList.remove('map--faded');
    mapForm.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    removeDisabled(formFieldset);
    removeDisabled(mapFormSelect);
    removeDisabled(mapFormFieldset);
    var pins = window.data.createPins(window.const.NUMBER_PINS);
    window.map.createFragment(pins);
    activateRoomsInput();
    setAdressAttribute();
  };

  mapPinMain.addEventListener('mousedown', function () {
    activatePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === window.const.ENTER_KEYCODE) {
      activatePage();
    }
  });

  var titleInput = adForm.querySelector('#title');

  titleInput.setAttribute('minlength', window.const.TITLE_MINLENGTH);
  titleInput.setAttribute('maxlength', window.const.TITLE_MAXLENGTH);
  titleInput.setAttribute('required', '');

  var priceInput = adForm.querySelector('#price');

  priceInput.setAttribute('max', window.const.MAXPRICE);
  priceInput.setAttribute('required', '');
  priceInput.setAttribute('placeholder', window.const.PRICE_PLACEHOLDER);

  var typeInput = adForm.querySelector('#type');

  typeInput.addEventListener('change', function () {
    if (typeInput.value === 'bungalo') {
      priceInput.setAttribute('min', window.const.BUNGALO_PRICE);
      priceInput.setAttribute('placeholder', window.const.BUNGALO_PRICE);
    } else if (typeInput.value === 'flat') {
      priceInput.setAttribute('min', window.const.FLAT_PRICE);
      priceInput.setAttribute('placeholder', window.const.FLAT_PRICE);
    } else if (typeInput.value === 'house') {
      priceInput.setAttribute('min', window.const.HOUSE_PRICE);
      priceInput.setAttribute('placeholder', window.const.HOUSE_PRICE);
    } else if (typeInput.value === 'palace') {
      priceInput.setAttribute('min', window.const.PALACE_PRICE);
      priceInput.setAttribute('placeholder', window.const.PALACE_PRICE);
    }
  });

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

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
})();
