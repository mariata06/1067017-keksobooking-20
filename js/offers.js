'use strict';

(function () {
  var PIN_NUMBER_LIMIT = 5;
  var similarListElement = document.querySelector('.map__pins'); // карта с пинами объявлений на карте
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
    var advertElement = newAdvert.cloneNode(true);
    advertElement.querySelector('.map__pin--image').src = variantStorage.author.avatar;
    advertElement.querySelector('.map__pin--image').alt = variantStorage.offer.title;
    advertElement.style.left = variantStorage.location.x - window.util.PIN_X + 'px';
    advertElement.style.top = variantStorage.location.y - window.util.PIN_Y + 'px';

    return advertElement;
  };

  var renderSuccess = function () {
    var successElement = newSuccess.cloneNode(true);
    return successElement;
  };

  var renderError = function () {
    var errorElement = newError.cloneNode(true);
    return errorElement;
  };

  var renderOffer = function (variantOffer) {
    var offerElement = newOffer.cloneNode(true);
    offerElement.querySelector('.popup__title').textContent = variantOffer.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = variantOffer.offer.address;
    offerElement.querySelector('.popup__text--price').textContent = variantOffer.offer.price + ' р/ночь';
    offerElement.querySelector('.popup__type').textContent = variantOffer.offer.type;

    if (variantOffer.offer.rooms === 0 && variantOffer.offer.guests === 0) {
      offerElement.querySelector('.popup__text--capacity').classList.add('hidden');
    } else {
      offerElement.querySelector('.popup__text--capacity').textContent = variantOffer.offer.rooms + ' комнаты для ' + variantOffer.offer.guests + ' гостей';
    }

    if (variantOffer.offer.checkin === 0 && variantOffer.offer.checkout === 0) {
      offerElement.querySelector('.popup__text--time').classList.add('hidden');
    } else {
      offerElement.querySelector('.popup__text--time').textContent = 'заезд после ' + variantOffer.offer.checkin + ' выезд после ' + variantOffer.offer.checkout;
    }

    if (variantOffer.offer.features.length === 0) {
      offerElement.querySelector('.popup__features').classList.add('hidden');
    } else {
      offerElement.querySelector('.popup__features').textContent = variantOffer.offer.features.join(' ');
    }

    offerElement.querySelector('.popup__description').textContent = variantOffer.offer.description;

    var photoBlock = offerElement.querySelector('.popup__photos');
    if (variantOffer.offer.photos.length === 0) {
      photoBlock.classList.add('hidden');
    } else {
      offerElement.querySelector('.popup__photo').src = variantOffer.offer.photos[0];

      variantOffer.offer.photos.forEach(function (element) {
        var photo = offerElement.querySelector('.popup__photo').cloneNode(true);
        photo.src = element;
        photoBlock.appendChild(photo);
      });
    }

    offerElement.querySelector('.popup__avatar').src = variantOffer.author.avatar;
    return offerElement;
  };

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
      similarListElement.appendChild(fragment);

      // делегирование
      similarListElement.addEventListener('click', function (event) {
        if (event.target.className !== 'map__overlay') {
          window.card.activateOffer(event.target.alt, offers);
        }
      });

      similarListElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          window.card.activateOffer(event.target.querySelector('.map__pin--image').alt, offers);
        }

        if (event.key === 'Escape') {
          clearOffer();
        }
      });

      map.classList.remove('map--faded');
    }, function () {});

    //рабочее место для устранения доп.подгрузки data:
    //window.main.mapPinMajor.removeEventListener('mousedown', window.main.actiFunc);
  };

  var clearOffer = function () {
    Array.from(pinBlock.children).forEach(function (element) {
      pinBlock.removeChild(element);
    });
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
    similarListElement: similarListElement,
    map: map
  };
})();
