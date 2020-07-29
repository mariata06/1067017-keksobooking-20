'use strict';

(function () {
  var START_X_COORDS = '570px';
  var START_Y_COORDS = '375px';
  var MIN_X_COORDS = -33;
  var MAX_X_COORDS = 1167;
  var MIN_Y_COORDS = 130;
  var MAX_Y_COORDS = 630;
  var PIN_ARROW_HEIGHT = 22;

  window.main.mapPinMajor.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.main.startMap(evt);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = window.main.mapPinMajor.offsetTop - shift.y;
      if (currentY > MAX_Y_COORDS - window.main.mapPinMajor.clientHeight - PIN_ARROW_HEIGHT) {
        currentY = MAX_Y_COORDS - window.main.mapPinMajor.clientHeight - PIN_ARROW_HEIGHT;
      } else if (currentY < MIN_Y_COORDS - window.main.mapPinMajor.clientHeight - PIN_ARROW_HEIGHT) {
        currentY = MIN_Y_COORDS - window.main.mapPinMajor.clientHeight - PIN_ARROW_HEIGHT;
      }

      var currentX = window.main.mapPinMajor.offsetLeft - shift.x;
      if (currentX > MAX_X_COORDS) {
        currentX = MAX_X_COORDS;
      } else if (currentX < MIN_X_COORDS) {
        currentX = MIN_X_COORDS;
      }

      window.main.mapPinMajor.style.top = (currentY) + 'px';
      window.main.mapPinMajor.style.left = (currentX) + 'px';

      // false - значит не круглый маффин, а уже остроконечный пин
      window.main.setAddress(false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.offers.map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    window.offers.map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    var onMapMouseleave = function () {
      evt.preventDefault();
      window.offers.map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.offers.map.removeEventListener('mouseleave', onMapMouseleave);
    };

    window.offers.map.addEventListener('mouseleave', onMapMouseleave);
  });

  window.dialog = {
    START_X_COORDS: START_X_COORDS,
    START_Y_COORDS: START_Y_COORDS,
    PIN_ARROW_HEIGHT: PIN_ARROW_HEIGHT
  };
})();
