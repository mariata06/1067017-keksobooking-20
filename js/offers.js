'use strict';

(function () {
  // var advertTitles = ['Bungalos', 'Prince palace', 'Down town Appartments']; // строка, заголовок предложения
  // var housingTypes = ['palace', 'flat', 'house', 'bungalo']; // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  // var checkinTimes = ['12:00', '13:00', '14:00']; // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
  // var checkoutTimes = ['12:00', '13:00', '14:00']; // трока с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
  // var housingFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
  // var advertDescriptions = ['descrText1', 'descrText2', 'descrText3']; // строка с описанием,
  // var advertPictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var similarListElement = document.querySelector('.map__pins');
  var similarAdvertTemplate = document.querySelector('#pin');
  var newAdvert = similarAdvertTemplate.content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var card = document.querySelector('#card');
  var newOffer = card.content.querySelector('.map__card');
  var pinBlock = document.querySelector('.map__offers');


  var renderAdvert = function (variantStorage) {
    var advertElement = newAdvert.cloneNode(true);
    advertElement.children[0].src = variantStorage.author.avatar;
    advertElement.children[0].alt = variantStorage.offer.title;
    advertElement.style.left = variantStorage.location.x - window.util.PIN_X + 'px';
    advertElement.style.top = variantStorage.location.y - window.util.PIN_Y + 'px';

    return advertElement;
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

      Array.from(variantOffer.offer.photos).forEach(function (el) {
        var photo = offerElement.querySelector('.popup__photo').cloneNode(true);
        photo.src = el;
        photoBlock.appendChild(photo);
      });
    }

    offerElement.querySelector('.popup__avatar').src = variantOffer.author.avatar;
    return offerElement;
  }

  var activateMap = function () {
    window.backend.load(function (offers) {
      var fragment = document.createDocumentFragment();

      Array.from(offers).forEach(function (el) {
        fragment.appendChild(renderAdvert(el));
      })
      similarListElement.appendChild(fragment);

      // делегирование
      similarListElement.addEventListener('click', function (event) {
        console.log(event.target.alt);
        activateOffer(event.target.alt, offers);
      });

      similarListElement.addEventListener('keydown', function (event) {
        // почему event.target.alt undefined ?
        console.log(event.target.alt);
        if (event.key === 'Enter') {
          activateOffer(event.target.alt, offers);
        }

        if (event.key === 'Escape'){
          clearOffer();
        }

      });

      map.classList.remove('map--faded');
    }, function () {});
  };

  var clearOffer = function () {
    Array.from(pinBlock.children).forEach(function (el) {
      pinBlock.removeChild(el);
    });
  }

  var activateOffer = function (alt, offers) {
    clearOffer();

    Array.from(offers).forEach(function (el) {
      if (alt === el.offer.title) {
        pinBlock.appendChild(renderOffer(el));

        var popup = pinBlock.querySelector('.popup');
        var popupClose = popup.querySelector('.popup__close');

        var closePopup = function () {
          popup.classList.add('hidden');
        };

        popupClose.addEventListener('click', function () {
          closePopup();
        });
      }
    });
  };

  window.offers = {
    activateMap: activateMap
  };
})();
