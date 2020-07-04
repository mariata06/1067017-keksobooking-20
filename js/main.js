'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var fieldsetForms = adForm.querySelector('.ad-form__element');
  var fieldsetFilters = mapFiltersForm.querySelector('.map__features');
  var selectFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('.address');
  //var buttonSubmit = document.querySelector('.ad-form__submit');
  var successBlock = document.querySelector('.success__block');
  var errorBlock = document.querySelector('.error__block');
  var resetButton = adForm.querySelector('.ad-form__reset');

  // активация карты
  mapPinMain.addEventListener('mousedown', leftMouseButtonClickHandler);

  var flagMapActivation = false;

  function leftMouseButtonClickHandler(e) {
    if (typeof e === 'object' && e.button === 0) {
      if (!flagMapActivation) {
        window.offers.activateMap();

        flagMapActivation = true;
      }

      activateElementsOfForm(fieldsetForms);
      activateElementsOfForm(fieldsetFilters);
      activateElementsOfForm(selectFilters);

      adForm.classList.remove('ad-form--disabled');

      var xCoordinate = mapPinMain.style.left;
      var yCoordinate = mapPinMain.style.top;
      addressInput.value = Number(xCoordinate.substr(0, xCoordinate.length - 2)) + window.util.MUFFIN_WIDTH / 2 + ', ' + (Number(yCoordinate.substr(0, yCoordinate.length - 2)) + window.util.MUFFIN_HEIGHT);
      addressInput.setAttribute('readonly', true);
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

  //сокрытие открытой карточки объявления при клике на любой из фильтров
  selectFilters.forEach(function (el) {
    el.addEventListener('change', function () {
      window.offers.clearOffer();
    })
  })

  var doIfSuccess = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.offers.renderSuccess());
    successBlock.appendChild(fragment);
    successBlock.addEventListener('click', function (event) {
      var currentSuccess = successBlock.querySelector('.success');
      successBlock.removeChild(currentSuccess);
    });

    successBlock.addEventListener('keydown', function (event) {
      evt.preventDefault();
      if (event.key === 'Escape') {

        var currentSuccess = successBlock.querySelector('.success');
        successBlock.removeChild(currentSuccess);
      }
    });
  }

  var doIfError = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.offers.renderError());
    errorBlock.appendChild(fragment);

    var errorButton = errorBlock.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      var currentError = errorBlock.querySelector('.error');
      errorBlock.removeChild(currentError);
    });

    errorBlock.addEventListener('keydown', function (event) {
      evt.preventDefault();
      if (event.key === 'Escape') {
        var currentError = errorBlock.querySelector('.error');
        errorBlock.removeChild(currentError);
      }
    });
  }

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), doIfSuccess(), doIfError());
  });

  resetButton.addEventListener('click', function () {
    adForm.reset();
  })



  window.main = {
    adForm: adForm,
    addressInput: addressInput,
    mapFiltersForm: mapFiltersForm
    // leftMouseButtonClickHandler: leftMouseButtonClickHandler
  };

})();
