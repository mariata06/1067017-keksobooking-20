'use strict';

(function () {
  var load = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var URL = document.querySelector('.map__filters').action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    //try {
      xhr.send(data);
    //} catch () {}
  };

  window.backend = {
    load: load,
    save: save
  };
})();
