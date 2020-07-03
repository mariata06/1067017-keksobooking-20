'use strict';

(function () {
  var START_X_COORDS = '570px';
  var START_Y_COORDS = '375px';
  var MIN_X_COORDS = 0;
  var MAX_X_COORDS = 1137;
  var MIN_Y_COORDS = 130;
  var MAX_Y_COORDS = 630;

  var pinMain = document.querySelector('.map__pin--main');
  //var dialogHandle = pinMain.querySelector('.upload');

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

      var Y = pinMain.offsetTop - shift.y
      if (Y > MAX_Y_COORDS) {
        Y = MAX_Y_COORDS
      } else if (Y < MIN_Y_COORDS) {
        Y = MIN_Y_COORDS
      }

      var X = pinMain.offsetLeft - shift.x
      if (X > MAX_X_COORDS) {
        X = MAX_X_COORDS
      } else if (X < MIN_X_COORDS) {
        X = MIN_X_COORDS
      }

      pinMain.style.top = (Y) + 'px';
      pinMain.style.left = (X) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

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
