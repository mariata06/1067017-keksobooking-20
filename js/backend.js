'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  var load = function (onLoad, onError) {
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

    try {
      xhr.send();
    } catch (error) {
      onError('возникла ошибка: ' + error);
    }
  };

  var save = function (data, onLoad, onError) {
    var url = document.querySelector('.map__filters').action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    try {
      xhr.send(data);
    } catch (error) {
      onError('возникла ошибка: ' + error);
    }
  };

  window.backend = {
    load: load,
    save: save
  };
})();
