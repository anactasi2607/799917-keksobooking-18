'use strict';

(function () {
  function closePopup() {
    window.map.divCards.innerHTML = '';
    window.form.setPinClass();
  }

  window.util = {
    closePopup: closePopup
  };

})();
