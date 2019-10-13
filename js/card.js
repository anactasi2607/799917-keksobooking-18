'use strict';

//  Этот модуль отвечает за создание карточек пинов

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  function renderCard(card) {
    var cardElement = cardTemplate.cloneNode(true);
    var stateToType = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    var stateToFeatures = {
      'wifi': 'popup__feature popup__feature--wifi',
      'dishwasher': 'popup__feature popup__feature--dishwasher',
      'parking': 'popup__feature popup__feature--parking',
      'washer': 'popup__feature popup__feature--washer',
      'elevator': 'popup__feature popup__feature--elevator',
      'conditioner': 'popup__feature popup__feature--conditioner'
    };

    var featuresList = card.offer.features;

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = stateToType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var offerFeatures = cardElement.querySelector('.popup__features');
    offerFeatures.innerHTML = '';

    for (var i = 0; i < featuresList.length; i++) {
      var featuresElement = document.createElement('li');
      featuresElement.className = stateToFeatures[featuresList[i]];
      offerFeatures.appendChild(featuresElement);
    }

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var photosList = card.offer.photos;

    var offerPhotos = cardElement.querySelector('.popup__photos');
    offerPhotos.innerHTML = '';

    for (var z = 0; z < photosList.length; z++) {
      var photoElement = document.createElement('img');
      photoElement.className = 'popup__photo';
      photoElement.width = 45;
      photoElement.height = 40;
      photoElement.alt = 'Фотография жилья';
      photoElement.src = photosList[z];
      offerPhotos.appendChild(photoElement);
    }

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.setAttribute('hidden', '');
    return cardElement;
  }

  window.card = {
    renderCard: renderCard
  };

})();
