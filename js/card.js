'use strict';

(function () {

  var activateOffer = function (offerName, offers) {
    window.offers.clearOffer();

    var fragment = document.createDocumentFragment();
    offers.forEach(function (item) {
      if (offerName === item.offer.title) {
        fragment.appendChild(window.offers.renderOffer(item));

        var popup = fragment.querySelector('.popup');
        var popupClose = popup.querySelector('.popup__close');

        var closePopup = function () {
          popup.classList.add('hidden');
        };

        popupClose.addEventListener('click', function () {
          closePopup();
        });
      }
    });
    window.offers.pinBlock.appendChild(fragment);
  };

  window.card = {
    activateOffer: activateOffer
  };
})();
