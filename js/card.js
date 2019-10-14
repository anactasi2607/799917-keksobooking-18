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
    switch (value) {
      case 'wifi':
        var newValue = 'popup__feature popup__feature--wifi';
        break;
      case 'dishwasher':
        newValue = 'popup__feature popup__feature--dishwasher';
        break;
      case 'parking':
        newValue = 'popup__feature popup__feature--parking';
        break;
      case 'washer':
        newValue = 'popup__feature popup__feature--washer';
        break;
      case 'elevator':
        newValue = 'popup__feature popup__feature--elevator';
        break;
      case 'conditioner':
        newValue = 'popup__feature popup__feature--conditioner';
        break;
    }
    return newValue;
  }

  function renderPhotosGallery(photosArr, photoSection) {
    photoSection.innerHTML = '';

    for (var i = 0; i < photosArr.length; i++) {
      var photoElement = document.createElement('img');
      photoElement.className = 'popup__photo';
      photoElement.width = 45;
      photoElement.height = 40;
      photoElement.alt = 'Фотография жилья';
      photoElement.src = photosArr[i];
      photoSection.appendChild(photoElement);
    }
  }

  function renderFeaturesList(featuresList, featuresSection) {
    featuresSection.innerHTML = '';

    for (var i = 0; i < featuresList.length; i++) {
      var featuresElement = document.createElement('li');
      featuresElement.className = getOfferFeature(featuresList[i]);
      featuresSection.appendChild(featuresElement);
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

    var FeaturesList = cardElement.querySelector('.popup__features');
    renderFeaturesList(card.offer.features, FeaturesList);
    //  это можно было записать так:
    //  renderFeaturesList(card.offer.features, cardElement.querySelector('.popup__features'));

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var photoList = cardElement.querySelector('.popup__photos');
    renderPhotosGallery(card.offer.photos, photoList);
    //  это можно было записать так:
    //  renderPhotosGallery(card.offer.photos, cardElement.querySelector('.popup__photos'));

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.setAttribute('hidden', '');

    return cardElement;
  }

  window.card = {
    renderCard: renderCard
  };

})();
