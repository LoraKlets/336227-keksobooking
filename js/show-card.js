'use strict';
window.showCard = (function (pin, obj) {

  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('img');

  dialogTitle.src = pin.src;
  dialog.querySelector('.lodge__title').innerText = obj.title;
  dialog.querySelector('.lodge__address').innerText = obj.address;
  dialog.querySelector('.lodge__price').innerText = obj.price + '\u20bd' + '/ночь';
  var loageType = '';
  switch (obj.type) {
    case 'flat':
      loageType = 'квартира';
      break;
    case 'bungalo':
      loageType = 'бунгало';
      break;
    case 'house':
      loageType = 'дом';
      break;
  }
  dialog.querySelector('.lodge__type').innerText = loageType;
  dialog.querySelector('.lodge__rooms-and-guests').innerText = obj.rooms + ' комнаты для ' + ' ' + obj.guests + 'гостей';
  dialog.querySelector('.lodge__checkin-time').innerText = 'Заед после ' + obj.checkin + ', выезд до ' + obj.checkout;
  var features = dialog.querySelector('.lodge__features');
  features.innerHTML = '';
  var elem;
  for (var j = 0; j < obj.features.length; j++) {
    elem = document.createElement('span');
    elem.classList.add('feature__image');
    elem.classList.add('feature__image--' + obj.features[j]);
    features.appendChild(elem);
  }
  var photo = dialog.querySelector('.lodge__photos');
  photo.innerHTML = '';
  var cadr;
  for (var i = 0; i < obj.photos.length; i++) {
    cadr = document.createElement('img');
    cadr.src = obj.photos[i];
    cadr.setAttribute('width', '52');
    cadr.setAttribute('height', '42');
    cadr.setAttribute('alt', 'Lodge photo');
    photo.appendChild(cadr);
  }
  dialog.querySelector('.lodge__description').innerText = obj.description;
  // перетаскивание элемента dialog за иконку dialogTitle

  dialogTitle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
      dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});
