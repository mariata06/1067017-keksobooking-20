'use strict';

(function () {
  var START_X_COORDS = '570px';
  var START_Y_COORDS = '375px';
  var MIN_X_COORDS = 0;
  var MAX_X_COORDS = 1137;
  var MIN_Y_COORDS = 130;
  var MAX_Y_COORDS = 630;

  var pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('mousedown', function (evt) {
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

      var currentY = pinMain.offsetTop - shift.y;
      if (currentY > MAX_Y_COORDS) {
        currentY = MAX_Y_COORDS;
      } else if (currentY < MIN_Y_COORDS) {
        currentY = MIN_Y_COORDS;
      }

      var currentX = pinMain.offsetLeft - shift.x;
      if (currentX > MAX_X_COORDS) {
        currentX = MAX_X_COORDS;
      } else if (currentX < MIN_X_COORDS) {
        currentX = MIN_X_COORDS;
      }

      pinMain.style.top = (currentY) + 'px';
      pinMain.style.left = (currentX) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', window.main.leftMouseButtonClickHandler(upEvt));

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
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
