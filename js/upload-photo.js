'use strict';

//  Этот модуль отвечает за загрузку фото в объявление

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_PREVIEW_WIDTH = 70;
  var PHOTO_PREVIEW_HEIGHT = 70;
  var PHOTO_NUMBER = 10;
  var PHOTO_MARGIN = 3;

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  function setAcceptAttribute(elem) {
    elem.setAttribute('accept', 'image/png, image/gif, image/jpg, image/jpeg');
  }

  setAcceptAttribute(photoFileChooser);
  setAcceptAttribute(avatarFileChooser);
  photoFileChooser.setAttribute('multiple', 'true');

  function getOneImagePreview(fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    }

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function createImg(imgSrc) {
    var housePhotoImg = document.createElement('img');
    housePhotoImg.src = imgSrc;
    housePhotoImg.style.width = PHOTO_PREVIEW_WIDTH + 'px';
    housePhotoImg.style.height = PHOTO_PREVIEW_HEIGHT + 'px';
    housePhotoImg.style.margin = PHOTO_MARGIN + 'px';
    return housePhotoImg;
  }

  function getFewImagesPreviews(fileChooser, container) {
    var files = fileChooser.files;

    if (files) {
      var arrayFiles = Array.from(files);
      var matches = arrayFiles.every(function (elem) {
        var fileName = elem.name.toLowerCase();
        var formatCheck = FILE_TYPES.some(function (item) {
          return fileName.endsWith(item);
        });
        return formatCheck;
      });
    }

    if (matches) {
      Array.prototype.slice.call(files).forEach(function (file) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var housePhotoImg = photoPreview.querySelectorAll('img');
          var photoArray = Array.from(housePhotoImg);
          if (photoArray.length < PHOTO_NUMBER) {
            container.appendChild(createImg(reader.result));
          }
        });

        reader.readAsDataURL(file);
      });
    }
  }

  avatarFileChooser.addEventListener('change', function () {
    getOneImagePreview(avatarFileChooser, avatarPreview);
  });

  photoFileChooser.addEventListener('change', function () {
    getFewImagesPreviews(photoFileChooser, photoPreview);
  });

  function deleteFormImage() {
    var housePhotoImg = photoPreview.querySelectorAll('img');
    var photoArray = Array.from(housePhotoImg);

    if (photoArray) {
      photoArray.forEach(function (item) {
        item.remove();
      });
    }
    avatarPreview.src = 'img/avatars/default.png';
  }

  window.uploadPhoto = {
    deleteFormImage: deleteFormImage
  };
})();
