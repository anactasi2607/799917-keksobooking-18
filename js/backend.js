'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  var setup = function (onLoad, onError) {
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
    return xhr;
  };

  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }

  function removePopupMessage(element) {
    if (element) {
      element.remove();
    }
  }

  var mapPinMain = document.querySelector('.map__pin--main');

  function errorHandler(errorMessage) {
    var mainSection = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorText = errorTemplate.querySelector('p');
    errorText.textContent = errorMessage;

    var errorElement = errorTemplate.cloneNode(true);

    mainSection.appendChild(errorElement);

    function onErrorMessageClick() {
      removePopupMessage(errorElement);
      document.removeEventListener('click', onErrorMessageClick);
    }

    function onErrorMessageEsc(evt) {
      evt.preventDefault();
      if (evt.keyCode === window.const.ESC_KEYCODE) {
        removePopupMessage(errorElement);
        document.removeEventListener('keydown', onErrorMessageEsc);
      }
    }

    document.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageEsc);
    mapPinMain.addEventListener('mousedown', window.form.activatePage);
    mapPinMain.removeEventListener('keydown', window.form.activatePageKeyDown);
  }

  function saveSuccessHandler() {
    var mainSection = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    mainSection.appendChild(successElement);

    var successElem = document.querySelector('.success');

    function onSuccessMessageEsc(evt) {
      evt.preventDefault();
      if (evt.keyCode === window.const.ESC_KEYCODE) {
        removePopupMessage(successElem);
      }
      document.removeEventListener('keydown', onSuccessMessageEsc);
    }

    function onSuccessMessageClick(e) {
      e.preventDefault();
      removePopupMessage(successElem);
      document.removeEventListener('click', onSuccessMessageClick);
    }

    document.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessMessageEsc);
    mapPinMain.addEventListener('mousedown', window.form.activatePage);
    mapPinMain.removeEventListener('keydown', window.form.activatePageKeyDown);

    window.form.returnPageToDefault();
    window.form.deactivatePage();
  }

  window.backend = {
    load: load,
    errorHandler: errorHandler,
    save: save,
    saveSuccessHandler: saveSuccessHandler
  };
})();
