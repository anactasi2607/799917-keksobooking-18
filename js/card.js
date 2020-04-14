'use strict';

//  Этот модуль отвечает за создание карточек пинов

(function () {
  var IMG_WIDTH = 45;
  var IMG_HEIGHT = 40;

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function getOfferType(value) {
    var newValue;

    switch (value) {
      case 'flat':
        newValue = 'Квартира';
        break;
      case 'bungalo':
        newValue = 'Бунгало';
        break;
      case 'house':
        newValue = 'Дом';
        break;
      case 'palace':
        newValue = 'Дворец';
        break;
    }
    return newValue;
  }

  function getOfferFeature(value) {
    return '<li class = "popup__feature popup__feature--' + value + '"></li>';
  }

  function renderFeaturesList(featuresList, featuresSection) {
    featuresSection.innerHTML = '';

    featuresList.forEach(function (elem) {
      featuresSection.insertAdjacentHTML('beforeend', getOfferFeature(elem));
    });
  }

  function getOfferPhotos(elem) {
    return '<img src="' + elem + '" class="' + 'popup__photo' + '"" width="' + IMG_WIDTH + '" height="' + IMG_HEIGHT + '" alt="' + 'Фотография жилья' + '">';
  }

  function renderPhotosGallery(photosArr, photoSection) {
    photoSection.innerHTML = '';

    photosArr.forEach(function (elem) {
      photoSection.insertAdjacentHTML('beforeend', getOfferPhotos(elem));
    });
  }

  function closePopup() {
    window.map.divCards.innerHTML = '';
    window.form.setPinClass();
  }

  var mapPins = document.querySelector(".map__pins");

  function onPopupEsc(evt) {
    evt.preventDefault();
    if (evt.keyCode === window.const.ESC_KEYCODE) {
      closePopup();
      mapPins.removeEventListener('keydown', onPopupEsc);
    }
  }

  function renderCard(card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getOfferType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featuresListElement = cardElement.querySelector('.popup__features');
    renderFeaturesList(card.offer.features, featuresListElement);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var photoList = cardElement.querySelector('.popup__photos');
    renderPhotosGallery(card.offer.photos, photoList);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var closeCardElement = cardElement.querySelector('.popup__close');

    closeCardElement.addEventListener('click', closePopup);

    mapPins.addEventListener('keydown', onPopupEsc);

    return cardElement;
  }

  window.card = {
    renderCard: renderCard,
    closePopup: closePopup
  };

})();
