'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('.title');
  var pricePerNight = adForm.querySelector('.price');
  var typeOfHousing = adForm.querySelector('.housing_type');
  var roomsQuantity = adForm.querySelector('.room_number');
  var guestsQuantity = adForm.querySelector('.capacity');
  var checkinTime = adForm.querySelector('.timein');
  var checkoutTime = adForm.querySelector('.timeout');
  var avatarPhoto = adForm.querySelector('.ad-form-header__input');
  var housingPhoto = adForm.querySelector('.ad-form__input');
  var fileTypes = [
    'image/jpeg',
    'image/gif',
    'image/png',
    'image/svg'
  ];
  var avatarPreview = adForm.querySelector('.ad-form-header__preview');
  var housingPhotoContainer = adForm.querySelector('.ad-form__photo-container');

  var isEmptyAdPhoto = true;

  // выставление минимальной цены при загрузке страницы
  pricePerNight.min = window.util.MIN_PRICE[typeOfHousing.value];
  pricePerNight.max = window.util.MAX_PRICE;
  pricePerNight.placeholder = window.util.MIN_PRICE[typeOfHousing.value];

  // опеределяет мин цену за ночь по типу жилья
  typeOfHousing.addEventListener('change', function () {
    pricePerNight.min = window.util.MIN_PRICE[typeOfHousing.value];
  });

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

  typeOfHousing.addEventListener('change', function () {
    var selectedType = typeOfHousing.value;
    pricePerNight.placeholder = window.util.MIN_PRICE[selectedType];
  });

  // валидация полей формы число комнат - число гостей
  var checkGuests = function () {
    guestsQuantity.max = window.util.CAPACITY[roomsQuantity.value];
    if (guestsQuantity.value > guestsQuantity.max) {
      guestsQuantity.setCustomValidity('Количество гостей должна быть не больше ' + guestsQuantity.max);
    } else {
      guestsQuantity.setCustomValidity('');
    }
  };

  roomsQuantity.addEventListener('change', function () {
    checkGuests();
  });

  guestsQuantity.addEventListener('change', function () {
    checkGuests();
  });

  guestsQuantity.max = window.util.CAPACITY[roomsQuantity.value];
  guestsQuantity.value = roomsQuantity.value;

  // синхронизация полей время въезда - время выезда
  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });

  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });

  var validateFileType = function (file) {
    return fileTypes.some(function (type) {
      return file.type === type;
    });
  };

  // валидация поля загрузки аватара
  avatarPhoto.addEventListener('change', function () {
    var selectedFile = avatarPhoto.files[0];
    if (!validateFileType(selectedFile)) {
      avatarPhoto.setCustomValidity('Должны быть файлы svg, png, gif или jpg');
    } else {
      avatarPhoto.setCustomValidity('');
      var currentAvatar = avatarPreview.querySelector('.avatarImg');
      avatarPreview.removeChild(currentAvatar);
      handleFiles(selectedFile, avatarPreview, true);
    }
  });

  // валидация поля загрузки фото жилья
  housingPhoto.addEventListener('change', function () {
    var selectedFile = housingPhoto.files[0];
    if (!validateFileType(selectedFile)) {
      housingPhoto.setCustomValidity('Должны быть файлы svg, png, gif или jpg');
    } else {
      housingPhoto.setCustomValidity('');

      var divAdPhoto;
      if (window.validation.isEmptyAdPhoto) {
        divAdPhoto = housingPhotoContainer.querySelector('.ad-form__photo');
        handleFiles(selectedFile, divAdPhoto, false);
        window.validation.isEmptyAdPhoto = false;
      } else {
        divAdPhoto = document.createElement('div');
        divAdPhoto.classList.add('ad-form__photo');
        housingPhotoContainer.appendChild(divAdPhoto);
        var adFormPhotos = housingPhotoContainer.querySelectorAll('.ad-form__photo');
        handleFiles(selectedFile, adFormPhotos[adFormPhotos.length - 1], false);
      }
    }
  });

  function handleFiles(file, divAdFormPhoto, isAvatar) {
    var img = document.createElement('img');
    img.classList.add(isAvatar ? 'avatarImg' : 'housingImg');

    img.height = divAdFormPhoto.offsetHeight;
    img.width = divAdFormPhoto.offsetWidth;
    divAdFormPhoto.appendChild(img);

    var reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  window.validation = {
    adForm: adForm,
    avatarPreview: avatarPreview,
    isEmptyAdPhoto: isEmptyAdPhoto,
    pricePerNight: pricePerNight,
    typeOfHousing: typeOfHousing
  };
})();
