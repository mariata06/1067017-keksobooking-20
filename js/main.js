'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var fieldsetForms = adForm.querySelector('.ad-form__element');
  var fieldsetFilters = mapFiltersForm.querySelector('.map__features');
  var selectFilters = mapFiltersForm.querySelector('.map__filter');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('.address');

  // активация карты
  mapPinMain.addEventListener('mousedown', leftMouseButtonClickHandler);

  var flagMapActivation = false;

  function leftMouseButtonClickHandler(e) {
    if (typeof e === 'object' && e.button === 0) {
      if (!flagMapActivation) {
        window.validation.activateMap();
        flagMapActivation = true;
      }

      activateElementsOfForm(fieldsetForms);
      activateElementsOfForm(fieldsetFilters);
      activateElementsOfForm(selectFilters);

      adForm.classList.remove('ad-form--disabled');

      var xCoordinate = mapPinMain.style.left;
      var yCoordinate = mapPinMain.style.top;
      addressInput.value = Number(xCoordinate.substr(0, xCoordinate.length - 2)) + window.util.MUFFIN_WIDTH / 2 + ', ' + (Number(yCoordinate.substr(0, yCoordinate.length - 2)) + window.util.MUFFIN_HEIGHT);
    }
  }

  // блокировка селектов фильтров на карте
  mapFiltersForm.classList.add('ad-form--disabled');

  var activateElementsOfForm = function (tags) {
    Array.from(tags).forEach(function (el) {
      el.removeAttribute('disabled');
    });
  };

  var disactivate = function (tags) {
    Array.from(tags).forEach(function (el) {
      el.setAttribute('disabled', true);
    });
  };

  disactivate(fieldsetForms);
  disactivate(fieldsetFilters);
  disactivate(selectFilters);

  window.main = {
    adForm: adForm
  };
})();
