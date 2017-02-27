'use strict';
window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var tokyoFiltrSet = tokyoFilters.querySelector('.tokyo__filter-set');

  var filtr = function (pinData) {
    var filtrZna = true;
    var housingFeatures = tokyoFilters.querySelectorAll('.feature');
    for (var j = 0; j < housingFeatures.length; j++) {
      if ((housingFeatures[j].children[0].checked) && (pinData.offer.features.indexOf(housingFeatures[j].children[0].value) === -1)) {
        filtrZna = false;
      }
    }
    var filterSelect = tokyoFilters.querySelectorAll('.tokyo__filter');
    var filtrNam = ['type', 'price', 'rooms', 'guests'];
    for (j = 0; j < filterSelect.length; j++) {
      if (j !== 1) { // это не цена
        if ((filterSelect[j].value !== 'any') && (filterSelect[j].value !== String(pinData.offer[filtrNam[j]]))) {
          filtrZna = false;
        }
      } else { // поле цены обрабатывается особо
        switch (filterSelect[j].value) {
          case 'low':
            if (pinData.offer[filtrNam[j]] > 10000) {
              filtrZna = false;
            }
            break;
          case 'middle':
            if ((pinData.offer[filtrNam[j]] < 10000) || (pinData.offer[filtrNam[j]] > 50000)) {
              filtrZna = false;
            }
            break;
          case 'hight':
            if (pinData.offer[filtrNam[j]] < 50000) {
              filtrZna = false;
            }
            break;
        }
      }
    }
    return filtrZna;
  };

  tokyoFiltrSet.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      var pins = tokyoPinMap.querySelectorAll('.new');
      for (var i = 0; i < pins.length; i++) {
        tokyoPinMap.removeChild(pins[i]);
      }
      window.dialogHandle.closeDialog();
      similarApartments.forEach(function (item, i1, similarApartments) {
        if (filtr(item)) {
          tokyoPinMap.appendChild(window.render(item, i1));
        }
      });
    }
  });

  tokyoFilters.addEventListener('click', function (evt) {
    var pins = tokyoPinMap.querySelectorAll('.new');
    for (var i = 0; i < pins.length; i++) {
      tokyoPinMap.removeChild(pins[i]);
    }
    window.dialogHandle.closeDialog();
    similarApartments.forEach(function (item, i2, similarApartments) {
      if (filtr(item)) {
        tokyoPinMap.appendChild(window.render(item, i2));
      }
    });
  });

  var similarApartments = [];
  var onLoad = function (p) {
    similarApartments = JSON.parse(p);
    var pins = tokyoPinMap.querySelectorAll('.new');
    for (var i = 0; i < pins.length; i++) {
      tokyoPinMap.removeChild(pins[i]);
    }
    window.dialogHandle.closeDialog();
    for (i = 0; i < 3; i++) {
      tokyoPinMap.appendChild(window.render(similarApartments[i], i));
    }
  };

  var mainPin = tokyoPinMap.querySelector('.pin__main');
  var rentAddress = document.querySelector('#address');
  // координаты середины низа пина - их будем менять на сдвиг пина (shift.x и shift.y ) и их же будем передавать в строку адреса
  // а при таскании мышью главного пина будем ориентироваться на координаты левого верхнего угла
  var endCoords = {
    x: mainPin.offsetLeft + Math.floor(mainPin.clientWidth / 2),
    y: mainPin.offsetTop + mainPin.clientHeight
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (event) {
      event.preventDefault();
      var shift = {
        x: startCoords.x - event.clientX,
        y: startCoords.y - event.clientY
      };

      startCoords = {
        x: event.clientX,
        y: event.clientY
      };

      endCoords.x = endCoords.x - shift.x;
      endCoords.y = endCoords.y - shift.y;

      rentAddress.value = 'x: ' + endCoords.x + '   y:  ' + endCoords.y;

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };
  mainPin.addEventListener('mousedown', onMouseDown);

  var elementHandler = function (evt) {
    var pinActiveElement = document.querySelector('.pin--active');
    if (pinActiveElement) {
      pinActiveElement.classList.remove('pin--active');
      pinActiveElement.children[0].setAttribute('aria-pressed', 'false');
    }
    evt.target.parentNode.classList.add('pin--active');
    evt.target.setAttribute('aria-pressed', 'true');
    window.showCard(evt.target, similarApartments[evt.target.id].offer);
  };

  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };

  tokyoPinMap.addEventListener('click', function (evt) {
    if (evt.target.parentNode.classList.contains('new')) {
      elementHandler(evt);
      window.dialogHandle.openDialog(null);
    }
  });

  var onDialogCl = function () {
    var activePin = tokyoPinMap.querySelector('.pin--active');
    activePin.querySelector('img').focus();
  };

  tokyoPinMap.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      elementHandler(evt);
      window.dialogHandle.openDialog(onDialogCl);
    }
  });

  window.load(DATA_URL, onLoad);
  return {
    isActivateEvent: isActivateEvent,
    endCoords: endCoords
  };
})();
