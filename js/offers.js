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
  var offer = document.querySelector('.map__offers');

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

    if (variantOffer.offer.rooms == 0 && variantOffer.offer.guests == 0) {
      offerElement.querySelector('.popup__text--capacity').classList.add('hidden');
    } else {
      offerElement.querySelector('.popup__text--capacity').textContent = variantOffer.offer.rooms + ' комнаты для ' + variantOffer.offer.guests +' гостей';
    }

    if (variantOffer.offer.checkin == 0 && variantOffer.offer.checkout == 0) {
      offerElement.querySelector('.popup__text--time').classList.add('hidden');
    } else {
      offerElement.querySelector('.popup__text--time').textContent = 'заезд после ' + variantOffer.offer.checkin + ' выезд после ' + variantOffer.offer.checkout;
    }

    if (variantOffer.offer.features.length == 0) {
      offerElement.querySelector('.popup__features').classList.add('hidden');
    } else {
      for (var i = 0; i < variantOffer.offer.features.length; i++) {
        offerElement.querySelector('.popup__features').textContent += variantOffer.offer.features[i] +' ';
      }
    }

    offerElement.querySelector('.popup__description').textContent = variantOffer.offer.description;

    var photoBlock = offerElement.querySelector('.popup__photos');
    if (variantOffer.offer.photos.length == 0) {
      photoBlock.classList.add('hidden');
    } else {
      offerElement.querySelector('.popup__photo').src = variantOffer.offer.photos[0];
      for (var i = 1; i < variantOffer.offer.photos.length; i++) {
        var photo = offerElement.querySelector('.popup__photo').cloneNode(true);
        photo.src = variantOffer.offer.photos[i]
        photoBlock.appendChild(photo);
      }
    }

    offerElement.querySelector('.popup__avatar').src = variantOffer.author.avatar;
    return offerElement;
  }


  var activateMap = function () {
    window.backend.load(function (offers) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < offers.length; i++) {
        var newAdvert = renderAdvert(offers[i])
        fragment.appendChild(newAdvert);
/*
        var currentPin = fragment.children[fragment.children.length-1]
        currentPin.addEventListener('click', function () {
          console.log(currentPin.children[0].alt);
          activateOffer(currentPin.children[0].alt, offers);
        });
*/
      }
      similarListElement.appendChild(fragment);

      offer.appendChild(renderOffer(offers[0]));
      map.classList.remove('map--faded');
    }, function () {});
  };
/*
  var activateOffer = function (alt, offers) {
      for (var i = 0; i < offers.length; i++) {
        if (alt == offers[i].offer.title) {
          offer.appendChild(renderOffer(offers[i]));
          //offer.children[offer.children.length-1].style.zIndex += 10;
        }
      }
  }
*/

  window.offers = {
    activateMap: activateMap
  };
})();
