'use strict';

(function () {
  var mapPinMajor = document.querySelector('.map__pin--main');
  var addressInput = window.validation.adForm.querySelector('.address');
  var successBlock = document.querySelector('.success__block');
  var errorBlock = document.querySelector('.error__block');
  var resetButton = window.validation.adForm.querySelector('.ad-form__reset');
  var fieldsetForms = window.validation.adForm.querySelectorAll('.ad-form__element');

  // блокировка формы
  window.validation.adForm.classList.add('ad-form--disabled');

  var setAddress = function (isRound) {
    var xCoordinate = mapPinMajor.style.left;
    var yCoordinate = mapPinMajor.style.top;

    if (isRound) {
      addressInput.value = Math.round((Number(xCoordinate.substr(0, xCoordinate.length - 2)) + mapPinMajor.clientWidth / 2)) + ', ' + Math.round(Number(yCoordinate.substr(0, yCoordinate.length - 2)) + mapPinMajor.clientHeight / 2);
    } else {
      addressInput.value = Math.round((Number(xCoordinate.substr(0, xCoordinate.length - 2)) + mapPinMajor.clientWidth / 2)) + ', ' + Math.round(Number(yCoordinate.substr(0, yCoordinate.length - 2)) + mapPinMajor.clientHeight + window.dialog.PIN_ARROW_HEIGHT);
    }

    addressInput.setAttribute('readonly', true);
  };

  // координаты большой круглой метки после открытия страницы, но до активации карты
  var isRoundMuffin = true;
  setAddress(isRoundMuffin);

  var flagMapActivation = false;

  // активация фильтров жилья при активации карты
  var activateElementsOfForm = function (tags) {
    Array.from(tags).forEach(function (el) {
      el.removeAttribute('disabled');
    });
  };

  var deactivate = function (tags) {
    Array.from(tags).forEach(function (el) {
      el.setAttribute('disabled', true);
    });
  };

  deactivate(fieldsetForms);
  deactivate(window.settings.fieldsetFilters);
  deactivate(window.settings.selectFilters);

  function startMap(e) {
    if (typeof e === 'object' && e.button === 0) {
      if (!flagMapActivation) {
        window.offers.activateMap();
        flagMapActivation = true;
      }

      activateElementsOfForm(fieldsetForms);
      activateElementsOfForm(window.settings.fieldsetFilters);
      activateElementsOfForm(window.settings.selectFilters);
      window.validation.adForm.classList.remove('ad-form--disabled');

      isRoundMuffin = false;
      setAddress(isRoundMuffin);
    }
  }

  mapPinMajor.addEventListener('mousemove', function () {
    setAddress(isRoundMuffin);
  });

  var keydownActivation = function (evt) {
    if (evt.key === 'Enter') {
      if (!flagMapActivation) {
        window.offers.activateMap();
        flagMapActivation = true;
      }

      activateElementsOfForm(fieldsetForms);
      activateElementsOfForm(window.settings.fieldsetFilters);
      activateElementsOfForm(window.settings.selectFilters);
      window.validation.adForm.classList.remove('ad-form--disabled');

      isRoundMuffin = false;
      setAddress(isRoundMuffin);
    }
  };

  mapPinMajor.addEventListener('keydown', keydownActivation);

  var successEscape = function (event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      var currentSuccess = successBlock.querySelector('.success');
      if (currentSuccess !== null) {
        successBlock.removeChild(currentSuccess);
      }

      document.removeEventListener('keydown', successEscape);
    }
  };

  var doIfSuccess = function () {
    successBlock.appendChild(window.offers.renderSuccess());

    successBlock.addEventListener('click', function () {
      var currentSuccess = successBlock.querySelector('.success');
      if (currentSuccess !== null) {
        successBlock.removeChild(currentSuccess);
      }
      document.removeEventListener('keydown', successEscape);
    });

    document.addEventListener('keydown', successEscape);
    clearPins();
  };

  var errorEscape = function (event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      var currentError = errorBlock.querySelector('.error');
      if (currentError !== null) {
        errorBlock.removeChild(currentError);
      }

      document.removeEventListener('keydown', errorEscape);
    }
  };

  var doIfError = function () {
    errorBlock.appendChild(window.offers.renderError());

    var errorButton = errorBlock.querySelector('.error__button');
    errorBlock.addEventListener('click', function () {
      var currentError = errorBlock.querySelector('.error');
      if (currentError !== null) {
        errorBlock.removeChild(currentError);
      }

      document.removeEventListener('keydown', errorEscape);
    });

    errorButton.addEventListener('click', function () {
      var currentError = errorBlock.querySelector('.error');
      errorBlock.removeChild(currentError);
    });

    document.addEventListener('keydown', errorEscape);
    clearPins();
  };

  window.validation.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.validation.adForm), doIfSuccess, doIfError);
    resetForm();
    window.offers.clearOffer();
    deactivate(fieldsetForms);
    deactivate(window.settings.fieldsetFilters);
    deactivate(window.settings.selectFilters);
    clearPins();
    window.validation.adForm.classList.add('ad-form--disabled');
    window.settings.mapFiltersForm.classList.add('ad-form--disabled');
    window.validation.pricePerNight.placeholder = window.util.MIN_PRICE[window.validation.typeOfHousing.value];
  });

  var clearPins = function () {
    Array.from(window.offers.similarListPins.children).forEach(function (el) {
      if (el.className.indexOf('map__pin--offer') !== -1) {
        window.offers.similarListPins.removeChild(el);
      }
      flagMapActivation = false;
    });
  };

  // блокировка формы после отправки формы
  resetButton.addEventListener('click', function () {
    resetForm();
    clearPins();
  });

  var resetForm = function () {
    window.validation.adForm.reset();
    // очистка от фото жилья
    var photoContainer = window.validation.adForm.querySelector('.ad-form__photo-container');
    var photos = window.validation.adForm.querySelectorAll('.ad-form__photo');
    for (var i = 1; i < photos.length; i++) {
      photoContainer.removeChild(photos[i]);
    }
    photos[0].innerHTML = '';
    window.validation.isEmptyAdPhoto = true;
    // очистка от фото аватара
    var currentAvatar = window.validation.avatarPreview.querySelector('.avatarImg');
    currentAvatar.src = 'img/muffin-grey.svg';

    mapPinMajor.style.left = window.dialog.START_X_COORDS;
    mapPinMajor.style.top = window.dialog.START_Y_COORDS;
    setAddress(true);

    window.validation.adForm.classList.add('ad-form--disabled');
    window.settings.mapFiltersForm.classList.add('ad-form--disabled');
    window.offers.map.classList.add('map--faded');
    deactivate(fieldsetForms);
    deactivate(window.settings.fieldsetFilters);
    deactivate(window.settings.selectFilters);

    window.settings.mapFiltersForm.reset();
    window.offers.similarListPins.removeEventListener('click', window.offers.onActiveMapClick);
    window.offers.similarListPins.removeEventListener('keydown', window.offers.onActiveMapKeydown);
    window.offers.clearOffer();
    window.validation.pricePerNight.placeholder = window.util.MIN_PRICE[window.validation.typeOfHousing.value];
  };

  window.main = {
    addressInput: addressInput,
    startMap: startMap,
    mapPinMajor: mapPinMajor,
    doIfError: doIfError,
    keydownActivation: keydownActivation
  };
})();
