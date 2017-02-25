'use strict';
window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];
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
    };
    var filterSelect = tokyoFilters.querySelectorAll('.tokyo__filter');
    var filtrNam = ['type','price','rooms','guests'];
    for (var j = 0; j < filterSelect.length; j++) {
      if (j != 1) {
        if ((filterSelect[j].value != 'any') && (filterSelect[j].value != pinData.offer[filtrNam[j]])) {
        filtrZna = false;
        }
    } else {
        switch (filterSelect[j].value) {
            case 'low':
              if (pinData.offer[filtrNam[j]] > 10000) {
               filtrZna = false;
              }
              break;
            case 'middle':
              if ((pinData.offer[filtrNam[j]] < 10000) || ( pinData.offer[filtrNam[j]] > 50000)) {
                filtrZna = false;
              }
              break;
            case 'hight':
              if (pinData.offer[filtrNam[j]] < 50000) {
                filtrZna = false;
              }
              break;
        };
      };
    }
    return filtrZna;
  };
  tokyoFiltrSet.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'INPUT'){
      var pins = tokyoPinMap.querySelectorAll('.new');
      for (var i = 0; i < pins.length; i++) {
        tokyoPinMap.removeChild(pins[i]);
      };
       window.dialogHandle.dialogClose();
      similarApartments.forEach(function (item, i, similarApartments) {
        if (filtr(item)) { tokyoPinMap.appendChild(window.render(item, i));
        }
      });
    }
  });
  tokyoFilters.addEventListener('click', function (evt) {
    var pins = tokyoPinMap.querySelectorAll('.new');
    for (var i = 0; i < pins.length; i++) {
      tokyoPinMap.removeChild(pins[i]);
    };
     window.dialogHandle.dialogClose();
    similarApartments.forEach(function (item, i, similarApartments) {
      if (filtr(item)) { tokyoPinMap.appendChild(window.render(item, i));
      }
    });
  });

  var onLoad = function (p) {
    similarApartments = JSON.parse(p);
    console.log(similarApartments[0]);
    var pins = tokyoPinMap.querySelectorAll('.new');
    for (var i = 0; i < pins.length; i++) {
      tokyoPinMap.removeChild(pins[i]);
    }
    window.dialogHandle.dialogClose();
    similarApartments.forEach(function (item, i, similarApartments) {
      if (filtr(item)) { tokyoPinMap.appendChild(window.render(item, i));
      }
    });
  };
  var pinActiveRemove = function () {
    var pinActiveElement = document.querySelector('.pin--active');
    if (pinActiveElement) {
      var imgPinActiveElement = pinActiveElement.querySelector('img');
      pinActiveElement.classList.remove('pin--active');
      imgPinActiveElement.setAttribute('aria-pressed', 'false');
    }
  };
  window.load(DATA_URL, onLoad);
  return {
    pinActiveRemove: pinActiveRemove,
    elementHandler: function (evt) {
      window.initializePins.pinActiveRemove();
      evt.target.parentNode.classList.add('pin--active');
      evt.target.setAttribute('aria-pressed', 'true');

      window.showCard(evt.target, similarApartments[evt.target.id].offer);
     },
    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    }
  };
})();
