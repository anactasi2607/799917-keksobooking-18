'use strict';

//  Этот модуль отвечает за создание карточек пинов

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function getOfferType(value) {
    switch (value) {
      case 'flat':
        var newValue = 'Квартира';
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

    for (var i = 0; i < featuresList.length; i++) {
      var featuresElement = getOfferFeature(featuresList[i]);
      featuresSection.insertAdjacentHTML('beforeend', featuresElement);
    }
  }

  function getOfferPhotos(elem) {
    return '<img src="' + elem + '" class="' + 'popup__photo' + '"" width="' + 45 + '" height="' + 40 + '" alt="' + 'Фотография жилья' + '">';
  }

  function renderPhotosGallery(photosArr, photoSection) {
    photoSection.innerHTML = '';

    for (var i = 0; i < photosArr.length; i++) {
      var photoElement = getOfferPhotos(photosArr[i]);
      photoSection.insertAdjacentHTML('beforeend', photoElement);
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

    var featuresList = cardElement.querySelector('.popup__features');
    renderFeaturesList(card.offer.features, featuresList);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var photoList = cardElement.querySelector('.popup__photos');
    renderPhotosGallery(card.offer.photos, photoList);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  }

  window.card = {
    renderCard: renderCard
  };

})();
