'use strict';

var NUMBER_ADVERT = 8; // максимальное число объявлений
var LOC_X_MIN = 200; // минимальный Х для "адреса предложения"
var LOC_X_MAX = 1000; // максимальный Х для "адреса предложения"
var LOC_Y_MIN = 200; // минимальный Y для "адреса предложения"
var LOC_Y_MAX = 650; // максимальный Y для "адреса предложения"
var X_SHIFT = 100; // чтобы метки не попадали на края карты
var MIN_PRICE = 1000;
var MAX_PRICE = 10000;
var MIN_QTY_ROOMS = 1;
var MAX_QTY_ROOMS = 10;
var MIN_QTY_GUEST = 1;
var MAX_QTY_QUEST = 10;
var PIN_X_GAP = 25; // ширина метки пополам для расчета координаты по X
var PIN_Y_GAP = 70; // высота метки для раcчета координаты по Y
var WIDTH_BLOCK = 1100; // максимум по X где может находиться метка
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var titleArray = ['Bungalos', 'Prince palace', 'Down town Appartments']; //строка, заголовок предложения
var typeArray = ['palace', 'flat', 'house', 'bungalo']; // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
var checkinArray = ['12:00', '13:00', '14:00']; //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
var checkoutArray = ['12:00', '13:00', '14:00']; //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
var descriptionArray = ['descrText1', 'descrText2', 'descrText3']; //строка с описанием,
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarListElement = document.querySelector('.map__pins');
var similarAdvertTemplate = document.querySelector('#pin');
var newAdvert = similarAdvertTemplate.content.querySelector('.map__pin');

var getRandomElement = function (array) {
  return array[Math.floor(array.length * Math.random())];
};

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getMocks = function(number) {
  var mockOffers = [];

  for (var i = 0; i < number; i++) {

    var advert = {
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'}, //где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      offer: {
        title: getRandomElement(titleArray), //строка, заголовок предложения
        address: getRandomInteger(LOC_X_MIN, LOC_X_MAX) + ', ' + getRandomInteger(LOC_Y_MIN, LOC_Y_MAX), // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        price: getRandomInteger(MIN_PRICE, MAX_PRICE), // число, стоимость
        type: getRandomElement(typeArray), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: getRandomInteger(MIN_QTY_ROOMS, MAX_QTY_ROOMS), //число, количество комнат
        guests: getRandomInteger(MIN_QTY_GUEST, MAX_QTY_QUEST), //число, количество гостей, которое можно разместить
        checkin: getRandomElement(checkinArray), //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        checkout: getRandomElement(checkoutArray), //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: getRandomElement(featuresArray), //массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        description: getRandomElement(descriptionArray), //строка с описанием,
        photos: getRandomElement(photosArray) //массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      },
      location: {
        x: getRandomInteger(X_SHIFT, WIDTH_BLOCK - 2 * X_SHIFT), //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        y: getRandomInteger(PIN_Y_MIN, PIN_Y_MAX) //случайное число, координата y метки на карте от 130 до 630.
      }
    };

    mockOffers.push(advert);
  }
  return mockOffers;
}

var renderAdvert = function (variantStorage) {
  var advertElement = newAdvert.cloneNode(true);
  advertElement.children[0].src = variantStorage.author.avatar;
  advertElement.children[0].alt = variantStorage.offer.title;
  advertElement.style.left = variantStorage.location.x - PIN_X_GAP + 'px';
  advertElement.style.top = variantStorage.location.y - PIN_Y_GAP + 'px';

  return advertElement;
};

var getElementFragment = function (offers) {

   var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {

    fragment.appendChild(renderAdvert(offers[i]));

  }

  return fragment;

}

var mocks = getMocks(NUMBER_ADVERT);

similarListElement.appendChild(getElementFragment(mocks));
