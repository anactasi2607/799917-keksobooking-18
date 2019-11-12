'use strict';

//  Этот модуль отвечает за загрузку фото в объявление

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_PREVIEW_WIDTH = 70;
  var PHOTO_PREVIEW_HEIGHT = 70;

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoFileChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  function getImagePreview(fileChooser, preview) {
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

  avatarFileChooser.addEventListener('change', function () {
    getImagePreview(avatarFileChooser, avatarPreview);
  });

  photoFileChooser.addEventListener('change', function () {
    var housePhotoImg = photoPreview.querySelector('img');

    if (!housePhotoImg) {
      housePhotoImg = document.createElement('img');
      housePhotoImg.style.width = PHOTO_PREVIEW_WIDTH + 'px';
      housePhotoImg.style.height = PHOTO_PREVIEW_HEIGHT + 'px';
      photoPreview.appendChild(housePhotoImg);
    }

    getImagePreview(photoFileChooser, housePhotoImg);
  });

  function deleteFormImage() {
    var housePhotoImg = photoPreview.querySelector('img');
    if (housePhotoImg) {
      housePhotoImg.remove();
    }
    avatarPreview.src = 'img/avatars/default.png';
  }

  window.uploadPhoto = {
    deleteFormImage: deleteFormImage
  };
})();
