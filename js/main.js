'use strict';

var titleArray = ['Bungalos','Prince palace','Down town Appartments']; //строка, заголовок предложения
var addressArray = ['600, 350', '480, 500', '520, 460']; // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
var priceArray = [1000, 2000, 3000]; //число, стоимость
var typeArray = ['palace', 'flat', 'house', 'bungalo'];// строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
var roomsArray = [5, 1, 2, 8]; //число, количество комнат
var guestsArray = [1, 2, 3, 4]; //число, количество гостей, которое можно разместить
var checkinArray = ['12:00', '13:00', '14:00']; //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
var checkoutArray = ['12:00', '13:00', '14:00']; //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; //массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
var descriptionArray = ['descrText1', 'descrText2', 'descrText3']; //строка с описанием,
var photosArray = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var NUMBER_ADVERT = 8;
var similarListElement = document.querySelector('.map__pins');
var similarAdvertTemplate = document.querySelector('#pin');
var newAdvert = similarAdvertTemplate.content.querySelector('.map__pin');

var getRandomElement = function(array) {
  return array[Math.floor(array.length * Math.random())];
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mockOffers = [];

for (var i = 0; i < NUMBER_ADVERT; i++) {

  var advert = {
    author : {avatar: 'img/avatars/user0' + Math.floor(NUMBER_ADVERT*Math.random() + 1) + '.png'}, //где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    offer : {
      title: getRandomElement(titleArray), //строка, заголовок предложения
      address: getRandomElement(addressArray),// строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      price: getRandomElement(priceArray),//число, стоимость
      type: getRandomElement(typeArray), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      rooms: getRandomElement(roomsArray),//число, количество комнат
      guests: getRandomElement(guestsArray),//число, количество гостей, которое можно разместить
      checkin: getRandomElement(checkinArray),//строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      checkout: getRandomElement(checkoutArray),//строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      features: getRandomElement(featuresArray),//массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      description: getRandomElement(descriptionArray), //строка с описанием,
      photos: getRandomElement(photosArray)//массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    location : {
      x: 1100 * Math.random(), //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: 130 +  Math.random() * 500 //случайное число, координата y метки на карте от 130 до 630.
    }
  };

  mockOffers.push(advert);
}

var renderAdvert = function (advert) {
  var advertElement = newAdvert.cloneNode(true);

  //advertElement.querySelector('.popup__avatar').src = advert.author.avatar;
  //advertElement.querySelector('.popup__title').textContent = advert.offer.title;
  //advertElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  //advertElement.querySelector('.popup__text--price').textContent = advert.offer.price;
  //advertElement.querySelector('.popup__type').textContent = advert.offer.type;
  //advertElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнат для ' + advert.offer.guests + ' гостей';
  //advertElement.querySelector('.popup__text--time').textContent = advert.offer.checkin + + advert.offer.checkout;
  //advertElement.querySelector('.popup__features').textContent = advert.offer.features;
  //advertElement.querySelector('.popup__description').textContent = advert.offer.description;
  //advertElement.querySelector('.popup__photos').src = advert.offer.photos;
  advertElement.children[0].src = advert.author.avatar;
  advertElement.children[0].alt = advert.offer.title;
  advertElement.style.left = advert.location.x + 'px';
  advertElement.style.top = advert.location.y + 'px';

  return advertElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < mockOffers.length; j++) {
  fragment.appendChild(renderAdvert(mockOffers[j]));
}
similarListElement.appendChild(fragment);

//console.log(mockOffers);
