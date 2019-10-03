'use strict';

//  В этом файле хранятся независимые функции

(function () {
  var getRandomValue = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  window.util = {
    getRandomValue: getRandomValue,
    getRandomInRange: getRandomInRange,
    shuffleArray: shuffleArray
  };
})();
