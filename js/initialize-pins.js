'use strict';
window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var onLoad = function(p) {
    similarApartments = JSON.parse(p);

    for (var i = 0; i < similarApartments.length; i++){

      tokyoPinMap.appendChild(window.render(similarApartments[i],i));
    }
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
