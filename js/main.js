'use strict';

var NUMBER_ADVERT = 8; // максимальное число объявлений
var LOC_X_MIN = 200; // минимальный Х для "адреса предложения"
var LOC_X_MAX = 1000; // максимальный Х для "адреса предложения"
var LOC_Y_MIN = 200; // минимальный Y для "адреса предложения"
var LOC_Y_MAX = 650; // максимальный Y для "адреса предложения"
var X_SHIFT = 100; // чтобы метки не попадали на края карты
var MIN_QTY_ROOMS = 1;
var MAX_QTY_ROOMS = 10;
var MIN_QTY_GUEST = 1;
var MAX_QTY_QUEST = 10;
var PIN_X = 25; // ширина метки пополам для расчета координаты по X
var PIN_Y = 70; // высота метки для раcчета координаты по Y
var MUFFIN_WIDTH = 62; // ширина красной метки
var MUFFIN_HEIGHT = 84; // высота красной метки
var WIDTH_BLOCK = 1100; // максимум по X где может находиться метка
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var MIN_PRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var CAPACITY = {
  '1': 1,
  '2': 2,
  '3': 3,
  '100': 0
};
var MAX_PRICE = 1000000;
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
var mapFiltersForm = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var fieldsetForms = adForm.querySelector('.ad-form__element');
var fieldsetFilters = mapFiltersForm.querySelector('.map__features');
var selectFilters = mapFiltersForm.querySelector('.map__filter');
var mapPinMain = document.querySelector('.map__pin--main');
var titleInput = adForm.querySelector('.title');
var pricePerNight = adForm.querySelector('.price');
var typeOfHousing = adForm.querySelector('.housing_type');
var qtyRooms = adForm.querySelector('.room_number');
var qtyGuests = adForm.querySelector('.capacity');
var addressInput = adForm.querySelector('.address');

typeOfHousing.addEventListener('change', function () {
  pricePerNight.min = MIN_PRICE[typeOfHousing.value];
});

pricePerNight.max = MAX_PRICE;

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

pricePerNight.addEventListener('invalid', function () {
  if (pricePerNight.validity.rangeUnderflow) {
    pricePerNight.setCustomValidity('Цена за ночь должна быть не меньше ' + pricePerNight.min);
  } else if (pricePerNight.validity.rangeOverflow) {
    pricePerNight.setCustomValidity('Стоимость за ночь не должна превышать ' + MAX_PRICE + ' рублей');
  } else if (pricePerNight.validity.valueMissing) {
    pricePerNight.setCustomValidity('Обязательное поле');
  } else {
    pricePerNight.setCustomValidity('');
  }
});

/*
qtyRooms.addEventListener('change', function () {
  qtyGuests.max = CAPACITY[qtyRooms.value];//как будто не меняет
  checkGuests();
  //qtyGuests.value = qtyRooms.value;
  //console.log('guest_value=', qtyGuests.value, '> max_guest=', qtyGuests.max, qtyGuests.value > qtyGuests.max);
});
*/

var checkGuests = function () {
  qtyGuests.max = CAPACITY[qtyRooms.value];
  console.log('guest_value=', qtyGuests.value, '> max_guest=', qtyGuests.max, qtyGuests.value > qtyGuests.max);
  if (qtyGuests.value > qtyGuests.max) {
    qtyGuests.setCustomValidity('Количество гостей должна быть не больше ' + qtyGuests.max);
  } else {
    qtyGuests.setCustomValidity('');
  }
};

qtyRooms.addEventListener('change', function () {
  checkGuests();
});

qtyGuests.addEventListener('change', function () {
  checkGuests();
});

qtyGuests.max = CAPACITY[qtyRooms.value];
qtyGuests.value = qtyRooms.value;


mapPinMain.addEventListener('mousedown', leftMouseButtonClickHandler);

var flagMapActivation = false;

function leftMouseButtonClickHandler(e) {
  if (typeof e === 'object' && e.button === 0) {
    if (!flagMapActivation) {
      activateMap();
      flagMapActivation = true;
    }

    activateElementsOfForm(fieldsetForms);
    activateElementsOfForm(fieldsetFilters);
    activateElementsOfForm(selectFilters);

    adForm.classList.remove('ad-form--disabled');

    var xCoordinate = mapPinMain.style.left;
    var yCoordinate = mapPinMain.style.top;
    addressInput.value = Number(xCoordinate.substr(0, xCoordinate.length - 2)) + MUFFIN_WIDTH / 2 + ', ' + (Number(yCoordinate.substr(0, yCoordinate.length - 2)) + MUFFIN_HEIGHT);
  }
}

mapFiltersForm.classList.add('ad-form--disabled');

var activateElementsOfForm = function (tags) {
  Array.from(tags).forEach(function (el) {
    el.removeAttribute('disabled');
  });
};

var disactivate = function (tags) {
  for (var i = 0; i < tags.length; i++) {
    tags[i].setAttribute('disabled', true);
  }
};

disactivate(fieldsetForms);
disactivate(fieldsetFilters);
disactivate(selectFilters);
var getRandomElement = function (array) {
  return array[Math.floor(array.length * Math.random())];
};

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var map = document.querySelector('.map');

var getMocks = function (number) {
  var mockOffers = [];

  for (var i = 0; i < number; i++) {

    var advert = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      }, // где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      offer: {
        title: getRandomElement(advertTitles), // строка, заголовок предложения
        address: getRandomInteger(LOC_X_MIN, LOC_X_MAX) + ', ' + getRandomInteger(LOC_Y_MIN, LOC_Y_MAX), // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        price: getRandomInteger(MIN_PRICE, MAX_PRICE), // число, стоимость
        type: getRandomElement(housingTypes), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        rooms: getRandomInteger(MIN_QTY_ROOMS, MAX_QTY_ROOMS), // число, количество комнат
        guests: getRandomInteger(MIN_QTY_GUEST, MAX_QTY_QUEST), // число, количество гостей, которое можно разместить
        checkin: getRandomElement(checkinTimes), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        checkout: getRandomElement(checkoutTimes), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: getRandomElement(housingFeatures), // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        description: getRandomElement(advertDescriptions), // строка с описанием,
        photos: getRandomElement(advertPictures) // массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      },
      location: {
        x: getRandomInteger(X_SHIFT, WIDTH_BLOCK - 2 * X_SHIFT), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        y: getRandomInteger(PIN_Y_MIN, PIN_Y_MAX) // случайное число, координата y метки на карте от 130 до 630.
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
  advertElement.style.left = variantStorage.location.x - PIN_X + 'px';
  advertElement.style.top = variantStorage.location.y - PIN_Y + 'px';

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
  var mocks = getMocks(NUMBER_ADVERT);
  map.classList.remove('map--faded');
  similarListElement.appendChild(getElementFragment(mocks));
};
