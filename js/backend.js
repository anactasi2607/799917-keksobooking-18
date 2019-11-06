'use strict';

(function () {
  function load(onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.const.SUCCESSFUL_REQUEST) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.const.TIMEOUT_VALUE;

    xhr.open('GET', URL);
    xhr.send();
  }

  function errorHandler(errorMessage) {
    var mainSection = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorText = errorTemplate.querySelector('p');
    errorText.textContent = errorMessage;

    var errorElement = errorTemplate.cloneNode(true);

    mainSection.appendChild(errorElement);

    function removeElementClick() {
      mainSection.removeChild(errorElement);
      document.removeEventListener('click', removeElementClick);
    }

    function removeElementEsc(evt) {
      evt.preventDefault();
      if (evt.keyCode === window.const.ESC_KEYCODE) {
        mainSection.removeChild(errorElement);
        document.removeEventListener('keydown', removeElementEsc);
      }
    }

    document.addEventListener('click', removeElementClick);
    document.addEventListener('keydown', removeElementEsc);
  }

  function save(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', URL);
    xhr.send(data);
  }

  function saveSuccessHandler() {
    var mainSection = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    mainSection.appendChild(successElement);

    function removeElementClick() {
      mainSection.removeChild(successElement);
      document.removeEventListener('click', removeElementClick);
    }

    function removeElementEsc(evt) {
      evt.preventDefault();
      if (evt.keyCode === window.const.ESC_KEYCODE) {
        mainSection.removeChild(successElement);
        document.removeEventListener('keydown', removeElementEsc);
      }
    }

    document.addEventListener('click', removeElementClick);
    document.addEventListener('keydown', removeElementEsc);
    window.form.returnPageToDefault();
  }

  window.backend = {
    load: load,
    errorHandler: errorHandler,
    save: save,
    saveSuccessHandler: saveSuccessHandler
  };
})();
