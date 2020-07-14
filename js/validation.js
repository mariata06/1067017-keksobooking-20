'use strict';

(function () {
  var titleInput = window.main.adForm.querySelector('.title');
  var pricePerNight = window.main.adForm.querySelector('.price');
  var typeOfHousing = window.main.adForm.querySelector('.housing_type');
  var qtyRooms = window.main.adForm.querySelector('.room_number');
  var qtyGuests = window.main.adForm.querySelector('.capacity');
  var checkinTime = window.main.adForm.querySelector('.timein');
  var checkoutTime = window.main.adForm.querySelector('.timeout');
  var avatarPhoto = window.main.adForm.querySelector('.ad-form-header__input');
  var housingPhoto = window.main.adForm.querySelector('.ad-form__input');
  var fileTypes = [
    'image/jpeg',
    'image/gif',
    'image/png',
    'image/svg'
  ];
  var avatarPreview = window.main.adForm.querySelector('.ad-form-header__preview');
  var housingPhotoContainer = window.main.adForm.querySelector('.ad-form__photo-container');

  var isEmptyAdPhoto = true;

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
      // console.log('validation: ' + isEmptyAdPhoto)
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
    if (isAvatar) {
      img.classList.add('avatarImg');
    } else {
      img.classList.add('housingImg');
    }

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
    avatarPreview: avatarPreview,
    isEmptyAdPhoto: isEmptyAdPhoto,
    qtyGuests: qtyGuests,
    qtyRooms: qtyRooms
  }
})();
