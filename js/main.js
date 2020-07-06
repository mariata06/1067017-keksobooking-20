'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('.address');
  // var buttonSubmit = document.querySelector('.ad-form__submit');
  var successBlock = document.querySelector('.success__block');
  var errorBlock = document.querySelector('.error__block');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var fieldsetForms = adForm.querySelector('.ad-form__element');

  // активация карты
  mapPinMain.addEventListener('mousedown', leftMouseButtonClickHandler);

  var flagMapActivation = false;

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
  disactivate(window.filters.fieldsetFilters);
  disactivate(window.filters.selectFilters);

  function leftMouseButtonClickHandler(e) {
    if (typeof e === 'object' && e.button === 0) {
      if (!flagMapActivation) {
        window.offers.activateMap();

        flagMapActivation = true;
      }

      activateElementsOfForm(fieldsetForms);
      activateElementsOfForm(window.filters.fieldsetFilters);
      activateElementsOfForm(window.filters.selectFilters);

      adForm.classList.remove('ad-form--disabled');

      var xCoordinate = mapPinMain.style.left;
      var yCoordinate = mapPinMain.style.top;
      addressInput.value = Number(xCoordinate.substr(0, xCoordinate.length - 2)) + window.util.MUFFIN_WIDTH / 2 + ', ' + (Number(yCoordinate.substr(0, yCoordinate.length - 2)) + window.util.MUFFIN_HEIGHT);
      addressInput.setAttribute('readonly', true);
    }
  }

  var doIfSuccess = function () {
    // var fragment = document.createDocumentFragment();
    // fragment.appendChild(window.offers.renderSuccess());
    successBlock.appendChild(window.offers.renderSuccess());
    successBlock.addEventListener('click', function () {
      var currentSuccess = successBlock.querySelector('.success');
      successBlock.removeChild(currentSuccess);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        var currentSuccess = successBlock.querySelector('.success');
        successBlock.removeChild(currentSuccess);
      }
    });
  };

  var doIfError = function () {
    // var fragment = document.createDocumentFragment();
    // fragment.appendChild(window.offers.renderError());
    errorBlock.appendChild(window.offers.renderError());

    var errorButton = errorBlock.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      var currentError = errorBlock.querySelector('.error');
      errorBlock.removeChild(currentError);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        var currentError = errorBlock.querySelector('.error');
        errorBlock.removeChild(currentError);
      }
    });
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), doIfSuccess, doIfError);
  });

  resetButton.addEventListener('click', function () {
    adForm.reset();
  });

  window.main = {
    adForm: adForm,
    addressInput: addressInput
  };

})();
