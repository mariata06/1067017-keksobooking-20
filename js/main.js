'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('.address');
  var successBlock = document.querySelector('.success__block');
  var errorBlock = document.querySelector('.error__block');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var fieldsetForms = adForm.querySelectorAll('.ad-form__element');
  // var mapPins = document.querySelector('.map-pins');

  // блокировка формы
  adForm.classList.add('ad-form--disabled');

  // координаты большой круглой метки после открытия страницы, но до активации карты
  var xCoordinate = mapPinMain.style.left;
  var yCoordinate = mapPinMain.style.top;
  var imgMuffin = document.querySelector('.map__pin--main').children[0]
  addressInput.value = Number(xCoordinate.substr(0, xCoordinate.length - 2)) + imgMuffin.width / 2 + ', ' + (Number(yCoordinate.substr(0, yCoordinate.length - 2)) + imgMuffin.height / 2);

  // активация карты
  mapPinMain.addEventListener('mousedown', leftMouseButtonClickHandler);

  var flagMapActivation = false;

  //активация фильтров жилья при активации карты
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

      xCoordinate = mapPinMain.style.left;
      yCoordinate = mapPinMain.style.top;
      addressInput.value = Number(xCoordinate.substr(0, xCoordinate.length - 2)) + window.util.MUFFIN_WIDTH / 2 + ', ' + (Number(yCoordinate.substr(0, yCoordinate.length - 2)) + window.util.MUFFIN_HEIGHT);
      addressInput.setAttribute('readonly', true);
    }
  }

  var doIfSuccess = function () {
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

    clearPins();
  };

  var doIfError = function () {
    errorBlock.appendChild(window.offers.renderError());

    var errorButton = errorBlock.querySelector('.error__button');
    errorBlock.addEventListener('click', function () {
      var currentError = errorBlock.querySelector('.error');
      if (currentError !== null) {
        errorBlock.removeChild(currentError);
      }
    });

    errorButton.addEventListener('click', function () {
      var currentError = errorBlock.querySelector('.error');
      errorBlock.removeChild(currentError);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        var currentError = errorBlock.querySelector('.error');
        console.log(currentError);
        if (currentError !== null) {
          errorBlock.removeChild(currentError);
        }
      }
    });
    clearPins();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), doIfSuccess, doIfError);
    resetForm();
    // set disabled
    window.offers.clearOffer();
    adForm.classList.add('ad-form--disabled');
    disactivate(fieldsetForms);
    disactivate(window.filters.fieldsetFilters);
    disactivate(window.filters.selectFilters);
    clearPins();
  });

  var clearPins = function () {
    Array.from(window.offers.similarListElement.children).forEach(function (el) {
      if (el.className.indexOf('map__pin--offer') !== -1) {
        window.offers.similarListElement.removeChild(el);
      }
      // console.log(el.className);
      flagMapActivation = false;
    });
  };

  // блокировка формы после отправки формы
  //disactivate(fieldsetForms);

  resetButton.addEventListener('click', function () {
    resetForm();
    clearPins();
  });

  var resetForm = function () {
    adForm.reset();
    //cleaning pictures
    var photoContainer = adForm.querySelector('.ad-form__photo-container');
    var photos = adForm.querySelectorAll('.ad-form__photo');
    for (var i = 1; i < photos.length; i++) {
      photoContainer.removeChild(photos[i]);
    }
    photos[0].innerHTML = '';
    window.validation.isEmptyAdPhoto = true;
    // console.log('main: ' + window.validation.isEmptyAdPhoto)
    // cleaning avatar
    var currentAvatar = window.validation.avatarPreview.querySelector('.avatarImg');
    currentAvatar.src = 'img/muffin-grey.svg';
    //соответств комнат
    window.validation.qtyGuests.value = window.validation.qtyRooms.value; // не выставляется обратно единичка - 1 гость для  одной комнаты при вызове resetForm
    //window.validation.qtyGuests.children[2].selected= true;
  }


  window.main = {
    adForm: adForm,
    addressInput: addressInput,
    leftMouseButtonClickHandler: leftMouseButtonClickHandler
  };
})();
