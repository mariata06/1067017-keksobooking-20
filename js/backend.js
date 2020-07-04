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
    // console.log(URL);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        window.setup.userDialog.classList.add('hidden');
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
