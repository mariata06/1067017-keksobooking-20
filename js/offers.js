'use strict';

(function () {
  var PIN_NUMBER_LIMIT = 5;
  var similarListPins = document.querySelector('.map__pins'); // карта с пинами объявлений на карте
  var similarAdvertTemplate = document.querySelector('#pin');
  var newAdvert = similarAdvertTemplate.content.querySelector('.map__pin'); // пин объявления на карте
  var map = document.querySelector('.map');
  var card = document.querySelector('#card');
  var newOffer = card.content.querySelector('.map__card');
  var pinBlock = document.querySelector('.map__offers');
  var data = [];
  var successMessageTemplate = document.querySelector('#success');
  var newSuccess = successMessageTemplate.content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error');
  var newError = errorMessageTemplate.content.querySelector('.error');

  var renderAdvert = function (variantStorage) {
    var advertisement = newAdvert.cloneNode(true);
    var pin = advertisement.querySelector('.map__pin--image')
    pin.src = variantStorage.author.avatar;
    pin.alt = variantStorage.offer.title;
    advertisement.style.left = variantStorage.location.x - window.util.PIN_X + 'px';
    advertisement.style.top = variantStorage.location.y - window.util.PIN_Y + 'px';

    return advertisement;
  };

  var renderSuccess = function () {
    var successMessage = newSuccess.cloneNode(true);
    return successMessage;
  };

  var renderError = function () {
    var errorMessage = newError.cloneNode(true);
    return errorMessage;
  };

  var renderOffer = function (variantOffer) {
    var offerDescription = newOffer.cloneNode(true);
    offerDescription.querySelector('.popup__title').textContent = variantOffer.offer.title;
    offerDescription.querySelector('.popup__text--address').textContent = variantOffer.offer.address;
    offerDescription.querySelector('.popup__text--price').textContent = variantOffer.offer.price + ' р/ночь';
    offerDescription.querySelector('.popup__type').textContent = variantOffer.offer.type;

    if (variantOffer.offer.rooms === 0 && variantOffer.offer.guests === 0) {
      offerDescription.querySelector('.popup__text--capacity').classList.add('hidden');
    } else {
      offerDescription.querySelector('.popup__text--capacity').textContent = variantOffer.offer.rooms + ' комнаты для ' + variantOffer.offer.guests + ' гостей';
    }

    if (variantOffer.offer.checkin === 0 && variantOffer.offer.checkout === 0) {
      offerDescription.querySelector('.popup__text--time').classList.add('hidden');
    } else {
      offerDescription.querySelector('.popup__text--time').textContent = 'заезд после ' + variantOffer.offer.checkin + ' выезд после ' + variantOffer.offer.checkout;
    }

    if (variantOffer.offer.features.length === 0) {
      offerDescription.querySelector('.popup__features').classList.add('hidden');
    } else {
      offerDescription.querySelector('.popup__features').textContent = variantOffer.offer.features.join(' ');
    }

    offerDescription.querySelector('.popup__description').textContent = variantOffer.offer.description;

    var photoBlock = offerDescription.querySelector('.popup__photos');
    if (variantOffer.offer.photos.length === 0) {
      photoBlock.classList.add('hidden');
    } else {
      var photoItem = offerDescription.querySelector('.popup__photo');
      photoItem.src = variantOffer.offer.photos[0];

      variantOffer.offer.photos.forEach(function (element) {
        var photo = photoItem.cloneNode(true);
        photo.src = element;
        photoBlock.appendChild(photo);
      });
    }

    offerDescription.querySelector('.popup__avatar').src = variantOffer.author.avatar;

    document.addEventListener('keydown', onCloseOfferKeydown);

    return offerDescription;
  };

  var onActiveMapClick = null;
  var onActiveMapKeydown = null;

  var activateMap = function () {
    window.backend.load(function (offers) {
      var fragment = document.createDocumentFragment();
      window.settings.mapFiltersForm.classList.remove('ad-form--disabled');

      offers.forEach(function (element) {
        data.push(element);
      });

      // Вывод на карту не более 5 меток при активации карты
      for (var i = 0; i < PIN_NUMBER_LIMIT; i++) {
        fragment.appendChild(renderAdvert(offers[i]));
      }
      similarListPins.appendChild(fragment);

      // делегирование по click
      onActiveMapClick = function (event) {
        if (event.target.className !== 'map__overlay') {
          window.card.activateOffer(event.target.alt, offers);
        }
      };

      window.offers.onActiveMapClick = onActiveMapClick;

      similarListPins.addEventListener('click', onActiveMapClick);

      // делегирование по keydown
      onActiveMapKeydown = function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          // проверка, что не маффин
          if (event.target.querySelector('.map__pin--image') !== null) {
            window.card.activateOffer(event.target.querySelector('.map__pin--image').alt, offers);
          }
        }

        if (event.key === 'Escape') {
          clearOffer();
        }
      };

      window.offers.onActiveMapKeydown = onActiveMapKeydown;

      similarListPins.addEventListener('keydown', onActiveMapKeydown);

      map.classList.remove('map--faded');
    }, window.main.doIfError);

    window.main.mapPinMajor.removeEventListener('keydown', window.main.onActivatePageKeydown);
  };

  var onCloseOfferKeydown = function (event) {
    if (event.key === 'Escape') {
      clearOffer();
      document.removeEventListener('keydown', onCloseOfferKeydown);
    }
  };

  var clearOffer = function () {
    pinBlock.innerHTML = '';
    //Array.from(pinBlock.children).forEach(function (element) {
    //  pinBlock.removeChild(element);
    //});
  };

  window.offers = {
    data: data,
    activateMap: activateMap,
    clearOffer: clearOffer,
    renderAdvert: renderAdvert,
    pinBlock: pinBlock,
    renderOffer: renderOffer,
    renderSuccess: renderSuccess,
    renderError: renderError,
    similarListPins: similarListPins,
    map: map,
    onActiveMapClick: onActiveMapClick,
    onActiveMapKeydown: onActiveMapKeydown
  };
})();
