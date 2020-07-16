'use strict';

(function () {
  var MIN_HOUSE_PRICE = 10000;
  var MAX_HOUSE_PRICE = 50000;
  var mapFiltersForm = document.querySelector('.map__filters');
  var fieldsetFilters = mapFiltersForm.querySelector('.map__features');
  var selectFilters = mapFiltersForm.querySelectorAll('.map__filter');
  var housingTypeFilter = mapFiltersForm.querySelector('.housing-type');
  var housingPriceFilter = mapFiltersForm.querySelector('.housing-price');
  var housingRoomsFilter = mapFiltersForm.querySelector('.housing-rooms');
  var housingCapacityFilter = mapFiltersForm.querySelector('.housing-guests');

  var getCheckedCheckboxes = function () {
    var selectedCheckboxes = mapFiltersForm.querySelectorAll('.map__checkbox');
    var checkedValues = [];
    selectedCheckboxes.forEach(function (checkbox) {
      if (checkbox.checked) checkedValues.push(checkbox.value);
    });

    return checkedValues;
  }

  // блокировка селектов фильтров на карте
  mapFiltersForm.classList.add('ad-form--disabled');

  // сокрытие открытой карточки объявления при клике на любой из фильтров
  // устранение дребезга
  selectFilters.forEach(function (el) {
    el.addEventListener('change', window.debounce.debounce(function () {
      window.offers.clearOffer();
    }));
  });

  var isSelectedType = function (houseType, type) {
    var isFit = false;

    if (type === 'any') {
      isFit = true;
    } else {
      isFit = (houseType === type)
    }

    return isFit;
  }

  var isSelectedPrice = function (housePrice, priceRange) {
    var isInRange = false;

    switch (priceRange) {
      case 'any':
        isInRange = true;
        break;
      case 'middle':
        if (housePrice >= MIN_HOUSE_PRICE && housePrice <= MAX_HOUSE_PRICE) isInRange = true;
        break;
      case 'low':
        if (housePrice < MIN_HOUSE_PRICE) isInRange = true;
        break;
      case 'high':
        if (housePrice > MAX_HOUSE_PRICE) isInRange = true;
        break;
    }
    return isInRange;
  }

  var isSelectedRooms = function (houseRooms, rooms) {
    var isFit = false;
    if (rooms === 'any') {
      isFit = true;
    } else {
      isFit = (houseRooms == rooms);
    }
    return isFit;
  }

  var isSelectedGuests = function (houseGuests, guests) {
    var isFit = false;

    if (guests === 'any') {
      isFit = true;
    } else {
      isFit = (houseGuests == guests);
    }
    return isFit;
  }

  var isCheckedFeatures = function (houseFeatures, checkedFeatures) {
    var isFit = true;
    checkedFeatures.forEach(function (el) {
      if (houseFeatures.indexOf(el) == -1) {
        isFit = false;
      }
    })
    return isFit;
  }

  // активация фильтров
  mapFiltersForm.addEventListener('change', window.debounce.debounce(function () {
    var filteredOffers = [];
    var pinOffers = document.querySelectorAll('.map__pin--offer');
    pinOffers.forEach(function (el) {
      el.parentNode.removeChild(el);
    });

    window.offers.data.forEach(function (el) {

      var selectedType = housingTypeFilter.options[housingTypeFilter.selectedIndex].value;
      var selectedRange = housingPriceFilter.options[housingPriceFilter.selectedIndex].value;
      var selectedRooms = housingRoomsFilter.options[housingRoomsFilter.selectedIndex].value;
      var selectedGuests = housingCapacityFilter.options[housingCapacityFilter.selectedIndex].value;

      if (isSelectedType(el.offer.type, selectedType) &&
        isSelectedPrice(el.offer.price, selectedRange) &&
        isSelectedRooms(el.offer.rooms, selectedRooms) &&
        isSelectedGuests(el.offer.guests, selectedGuests) &&
        isCheckedFeatures(el.offer.features, getCheckedCheckboxes())
        ) {
        filteredOffers.push(el);
      }

    });

    var fragment = document.createDocumentFragment();
    var PIN_NUMBER_LIMIT = 5;
    for (var i = 0; i < filteredOffers.length; i++) {
      if (i === PIN_NUMBER_LIMIT) {
        break;
      }
      fragment.appendChild(window.offers.renderAdvert(filteredOffers[i]));
    }
    window.offers.similarListElement.appendChild(fragment);

    // делегирование
    window.offers.similarListElement.addEventListener('click', function (event) {
      window.card.activateOffer(event.target.alt, filteredOffers);
    });

    window.offers.similarListElement.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        window.card.activateOffer(event.target.children[0].alt, filteredOffers);
      }

      if (event.key === 'Escape') {
        window.offers.clearOffer();
      }
    });
  }));

  window.filters = {
    mapFiltersForm: mapFiltersForm,
    fieldsetFilters: fieldsetFilters,
    selectFilters: selectFilters
  };
})();
