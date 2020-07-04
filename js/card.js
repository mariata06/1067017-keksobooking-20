'use strict';

(function () {

  var activateOffer = function (alt, offers) {
    window.offers.clearOffer();

    Array.from(offers).forEach(function (el) {
      if (alt === el.offer.title) {
        window.offers.pinBlock.appendChild(window.offers.renderOffer(el));

        var popup = window.offers.pinBlock.querySelector('.popup');
        var popupClose = popup.querySelector('.popup__close');

        var closePopup = function () {
          popup.classList.add('hidden');
        };

        popupClose.addEventListener('click', function () {
          closePopup();
        });
      }
    });
  };

  window.card = {
    activateOffer: activateOffer
  };
})();
