'use strict';
window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;
  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
  // var panelTitle = panel.querySelector('img');
  // var panelClose = panel.querySelector('.dialog__close');

  var pinActiveRemove = function () {
    var pinActiveElement = document.querySelector('.pin--active');
    if (pinActiveElement) {
      var imgPinActiveElement = pinActiveElement.querySelector('img');
      pinActiveElement.classList.remove('pin--active');
      imgPinActiveElement.setAttribute('aria-pressed', 'false');
    }
  };
  return {
    pinActiveRemove: pinActiveRemove,
    elementHandler: function (evt) {
      window.initializePins.pinActiveRemove();
      evt.target.parentNode.classList.add('pin--active');
      evt.target.setAttribute('aria-pressed', 'true');
    },
    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    }
  }
})();
  /* var elementHandler = function (evt) {
     pinActiveRemove();
     evt.target.parentNode.classList.add('pin--active');
     evt.target.setAttribute('aria-pressed', 'true');
     // panelTitle.src = evt.target.src;
     // panel.classList.remove('invisible');
     // panelClose.setAttribute('aria-pressed', 'false');
   };

   //element.addEventListener('click', elementHandler);
  // element.addEventListener('keydown', function (evt) {
     if (isActivateEvent(evt)) {
         elementHandler(evt);
       }
   });*/
