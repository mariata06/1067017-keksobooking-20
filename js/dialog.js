'use strict';

(function () {
  var START_X_COORDS = '570px';
  var START_Y_COORDS = '375px';
  var MIN_X_COORDS = -33;
  var MAX_X_COORDS = 1167;
  var MIN_Y_COORDS = 130;
  var MAX_Y_COORDS = 630;

  window.main.mapPinMajor.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = window.main.mapPinMajor.offsetTop - shift.y;
      if (currentY > MAX_Y_COORDS) {
        currentY = MAX_Y_COORDS;
      } else if (currentY < MIN_Y_COORDS) {
        currentY = MIN_Y_COORDS;
        console.log(currentY);
      }

      var currentX = window.main.mapPinMajor.offsetLeft - shift.x;
      if (currentX > MAX_X_COORDS) {
        currentX = MAX_X_COORDS;
      } else if (currentX < MIN_X_COORDS) {
        currentX = MIN_X_COORDS;
      }

      window.main.mapPinMajor.style.top = (currentY) + 'px';
      window.main.mapPinMajor.style.left = (currentX) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', window.main.onClickLeftMouseButton(upEvt));

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.main.mapPinMajor.removeEventListener('click', onClickPreventDefault);
        };
        window.main.mapPinMajor.addEventListener('click', onClickPreventDefault);

      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.dialog = {
    START_X_COORDS: START_X_COORDS,
    START_Y_COORDS: START_Y_COORDS
  };
})();
