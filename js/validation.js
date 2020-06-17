'use strict';

(function () {
  var titleInput = window.main.adForm.querySelector('.title');
  var pricePerNight = window.main.adForm.querySelector('.price');
  var typeOfHousing = window.main.adForm.querySelector('.housing_type');
  var qtyRooms = window.main.adForm.querySelector('.room_number');
  var qtyGuests = window.main.adForm.querySelector('.capacity');
  // опеределяет мин цену за ночь по типу жилья
  typeOfHousing.addEventListener('change', function () {
    pricePerNight.min = window.util.MIN_PRICE[typeOfHousing.value];
  });

  pricePerNight.max = window.util.MAX_PRICE;

  // валидация поля формы заголовок
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // валидация полей формы тип жилья - цена за ночь
  pricePerNight.addEventListener('invalid', function () {
    if (pricePerNight.validity.rangeUnderflow) {
      pricePerNight.setCustomValidity('Цена за ночь должна быть не меньше ' + pricePerNight.min);
    } else if (pricePerNight.validity.rangeOverflow) {
      pricePerNight.setCustomValidity('Стоимость за ночь не должна превышать ' + window.util.MAX_PRICE + ' рублей');
    } else if (pricePerNight.validity.valueMissing) {
      pricePerNight.setCustomValidity('Обязательное поле');
    } else {
      pricePerNight.setCustomValidity('');
    }
  });

  // валидация полей формы число комнат - число гостей
  var checkGuests = function () {
    qtyGuests.max = window.util.CAPACITY[qtyRooms.value];
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

  qtyGuests.max = window.util.CAPACITY[qtyRooms.value];
  qtyGuests.value = qtyRooms.value;
})();
