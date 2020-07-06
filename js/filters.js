'use strict';

(function () {
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
    selectedCheckboxes.forEach((checkbox) => {
      if(checkbox.checked) checkedValues.push(checkbox.value);
    });

    //console.log(checkedValues)
    return checkedValues;
  }

  // блокировка селектов фильтров на карте
  mapFiltersForm.classList.add('ad-form--disabled');

  // сокрытие открытой карточки объявления при клике на любой из фильтров
  selectFilters.forEach(function (el) {
    el.addEventListener('change', function () {
      window.offers.clearOffer();
    });
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
        if (housePrice >= 10000 && housePrice <= 50000) isInRange = true;
        break;
      case 'low':
        if (housePrice < 10000) isInRange = true;
        break;
      case 'high':
        if (housePrice > 50000) isInRange = true;
        break;
    }

    return isInRange;
  }

  var isSelectedRooms = function (houseRooms, rooms) {
    var isFit = false;
    /*
    switch (rooms) {
      case 'any':
        isFit = true;
        break;
      case '1':
        if (houseRooms === 1) isFit = true;
        break;
      case '2':
        if (houseRooms === 2) isFit = true;
        break;
      case '3':
        if (houseRooms === 3) isFit = true;
        break;
    }
*/
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
    //console.log(checkedFeatures)
    checkedFeatures.forEach(function (el) {
      // console.log(houseFeatures.indexOf(el))
      if (houseFeatures.indexOf(el) == -1) {
        isFit = false;
      }

    })
    return isFit;
  }

  // активация фильтров
  // housingTypeFilter.addEventListener('change', function () {
  mapFiltersForm.addEventListener('change', function () {
    // console.log(data[1]);
    var filteredOffers = [];
    // console.log(getCheckedCheckboxes());
    var pinOffers = document.querySelectorAll('.map__pin--offer');
    pinOffers.forEach(function (el) {
      el.parentNode.removeChild(el);
      // pinBlock.removeChild(el);
    });

    window.offers.data.forEach(function (el) {

      // console.log(housingPriceFilter.options[housingPriceFilter.selectedIndex].value);
      var selectedType = housingTypeFilter.options[housingTypeFilter.selectedIndex].value;
      var selectedRange = housingPriceFilter.options[housingPriceFilter.selectedIndex].value;
      var selectedRooms = housingRoomsFilter.options[housingRoomsFilter.selectedIndex].value;
      var selectedGuests = housingCapacityFilter.options[housingCapacityFilter.selectedIndex].value;
      // console.log(isCheckedFeatures(el.offer.features, getCheckedCheckboxes()));
      if (isSelectedType(el.offer.type, selectedType) &&
        isSelectedPrice(el.offer.price, selectedRange) &&
        isSelectedRooms(el.offer.rooms, selectedRooms) &&
        isSelectedGuests(el.offer.guests, selectedGuests) &&
        isCheckedFeatures(el.offer.features, getCheckedCheckboxes())) {
        filteredOffers.push(el);
      }
    });

    var fragment = document.createDocumentFragment();
    var PIN_NUMBER_LIMIT = 5;
    for (var i = 0; i < filteredOffers.length; i++) {
      if (i === PIN_NUMBER_LIMIT - 1) {
        break;
      }
      fragment.appendChild(window.offers.renderAdvert(filteredOffers[i]));
    }
    window.offers.similarListElement.appendChild(fragment);

    // делегирование
    window.offers.similarListElement.addEventListener('click', function (event) {
      // console.log(event.target.alt);
      window.card.activateOffer(event.target.alt, filteredOffers);
    });

    window.offers.similarListElement.addEventListener('keydown', function (event) {
      // почему event.target.alt undefined ?
      // console.log(event.target.alt);
      if (event.key === 'Enter') {
        window.card.activateOffer(event.target.children[0].alt, filteredOffers);
      }

      if (event.key === 'Escape') {
        clearOffer();
      }
    });
  });

  window.filters = {
    mapFiltersForm: mapFiltersForm,
    fieldsetFilters: fieldsetFilters,
    selectFilters: selectFilters
  };

})();
