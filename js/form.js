'use strict';

//  Этот модуль отвечает за активацию формы и валидацию

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var constant = window.const;

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
    mapForm.classList.add('ad-form--disabled');
    addDisabled(formFieldset);
    addDisabled(mapFormSelect);
    addDisabled(mapFormFieldset);
  }

  deactivatePage();

  function activatePage() {
    map.classList.remove('map--faded');
    mapForm.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    removeDisabled(formFieldset);
    removeDisabled(mapFormSelect);
    removeDisabled(mapFormFieldset);
    function createFragment(pin) {
      var mapPinsList = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pin.length; i++) {
        fragment.appendChild(window.pin.renderPin(pin[i]));
      }
      mapPinsList.appendChild(fragment);
    };

    window.backend.load(createFragment, window.backend.errorHandler);

    /*function successHandler(pin) {
      pin.forEach(window.pin.renderPin, window.pin.fragment);
    };

    window.backend.load(createFragment, window.backend.errorHandler);*/

    activateRoomsInput();
    setAdressAttribute();
    mapPinMain.removeEventListener('mousedown', activatePage);
    mapPinMain.removeEventListener('keydown', activatePageKeydown);
  }

  mapPinMain.addEventListener('mousedown', activatePage);

  function activatePageKeydown(evt) {
    evt.preventDefault();
    if (evt.keyCode === constant.ENTER_KEYCODE) {
      activatePage();
    }
  }

  mapPinMain.addEventListener('keydown', activatePageKeydown);

  var titleInput = adForm.querySelector('#title');

  titleInput.setAttribute('minlength', constant.TITLE_MINLENGTH);
  titleInput.setAttribute('maxlength', constant.TITLE_MAXLENGTH);
  titleInput.setAttribute('required', '');

  var priceInput = adForm.querySelector('#price');

  priceInput.setAttribute('max', constant.MAXPRICE);
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
