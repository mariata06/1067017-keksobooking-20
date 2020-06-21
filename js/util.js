'use strict';

(function () {
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
  var TIMES = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  }

  // универсальная функция определяет случайный элемент
  var getRandomElement = function (array) {
    return array[Math.floor(array.length * Math.random())];
  };

  // универсальная функция определяет случайное число
  function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  window.util = {
    NUMBER_ADVERT: NUMBER_ADVERT,
    LOC_X_MIN: LOC_X_MIN,
    LOC_X_MAX: LOC_X_MAX,
    LOC_Y_MIN: LOC_Y_MIN,
    LOC_Y_MAX: LOC_Y_MAX,
    X_SHIFT: X_SHIFT,
    MIN_QTY_ROOMS: MIN_QTY_ROOMS,
    MAX_QTY_ROOMS: MAX_QTY_ROOMS,
    MIN_QTY_GUEST: MIN_QTY_GUEST,
    MAX_QTY_QUEST: MAX_QTY_QUEST,
    PIN_X: PIN_X,
    PIN_Y: PIN_Y,
    MUFFIN_WIDTH: MUFFIN_WIDTH,
    MUFFIN_HEIGHT: MUFFIN_HEIGHT,
    WIDTH_BLOCK: WIDTH_BLOCK,
    PIN_Y_MIN: PIN_Y_MIN,
    PIN_Y_MAX: PIN_Y_MAX,
    MIN_PRICE: MIN_PRICE,
    CAPACITY: CAPACITY,
    MAX_PRICE: MAX_PRICE,
    getRandomElement: getRandomElement,
    getRandomInteger: getRandomInteger,
    TIMES: TIMES
  };
})();
