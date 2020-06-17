'use strict';

(function () {
  var advertTitles = ['Bungalos', 'Prince palace', 'Down town Appartments']; // строка, заголовок предложения
  var housingTypes = ['palace', 'flat', 'house', 'bungalo']; // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
  var checkinTimes = ['12:00', '13:00', '14:00']; // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
  var checkoutTimes = ['12:00', '13:00', '14:00']; // трока с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
  var housingFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
  var advertDescriptions = ['descrText1', 'descrText2', 'descrText3']; // строка с описанием,
  var advertPictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var similarListElement = document.querySelector('.map__pins');
  var similarAdvertTemplate = document.querySelector('#pin');
  var newAdvert = similarAdvertTemplate.content.querySelector('.map__pin');
  var map = document.querySelector('.map');

  var getMocks = function (number) {

    var mockOffers = [];

    for (var i = 0; i < number; i++) {
      var advert = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        }, // где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        offer: {
          title: window.util.getRandomElement(advertTitles), // строка, заголовок предложения
          address: window.util.getRandomInteger(window.util.LOC_X_MIN, window.util.LOC_X_MAX) + ', ' + window.util.getRandomInteger(window.util.LOC_Y_MIN, window.util.LOC_Y_MAX), // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
          price: window.util.getRandomInteger(window.util.MIN_PRICE, window.util.MAX_PRICE), // число, стоимость
          type: window.util.getRandomElement(housingTypes), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
          rooms: window.util.getRandomInteger(window.util.MIN_QTY_ROOMS, window.util.MAX_QTY_ROOMS), // число, количество комнат
          guests: window.util.getRandomInteger(window.util.MIN_QTY_GUEST, window.util.MAX_QTY_QUEST), // число, количество гостей, которое можно разместить
          checkin: window.util.getRandomElement(checkinTimes), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
          checkout: window.util.getRandomElement(checkoutTimes), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
          features: window.util.getRandomElement(housingFeatures), // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
          description: window.util.getRandomElement(advertDescriptions), // строка с описанием,
          photos: window.util.getRandomElement(advertPictures) // массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
        },
        location: {
          x: window.util.getRandomInteger(window.util.X_SHIFT, window.util.WIDTH_BLOCK - 2 * window.util.X_SHIFT), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
          y: window.util.getRandomInteger(window.util.PIN_Y_MIN, window.util.PIN_Y_MAX) // случайное число, координата y метки на карте от 130 до 630.
        }
      };
      mockOffers.push(advert);
    }
    return mockOffers;
  };

  var renderAdvert = function (variantStorage) {
    var advertElement = newAdvert.cloneNode(true);
    advertElement.children[0].src = variantStorage.author.avatar;
    advertElement.children[0].alt = variantStorage.offer.title;
    advertElement.style.left = variantStorage.location.x - window.util.PIN_X + 'px';
    advertElement.style.top = variantStorage.location.y - window.util.PIN_Y + 'px';

    return advertElement;
  };

  var getElementFragment = function (offers) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {

      fragment.appendChild(renderAdvert(offers[i]));

    }
    return fragment;
  };

  var activateMap = function () {
    var mocks = getMocks(window.util.NUMBER_ADVERT);
    map.classList.remove('map--faded');
    similarListElement.appendChild(getElementFragment(mocks));
  };

  window.validation = {
    activateMap: activateMap
  }
})();
