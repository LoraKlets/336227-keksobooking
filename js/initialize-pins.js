'use strict';
window.initializePins =( function (element,panel) {
  var ENTER_KEY_CODE = 13;
  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
  var panelTitle = panel.querySelector('img');
  var panelClose = panel.querySelector('.dialog__close');

  var elementPinHandler = function () {
    var pinActiveElement = element.querySelector('.pin--active');
    if (pinActiveElement) {
      var imgPinActiveElement = pinActiveElement.querySelector('img');
      pinActiveElement.classList.remove('pin--active');
      imgPinActiveElement.setAttribute('aria-pressed', 'false');
    }
  };
  var elementHandler = function (evt) {
    elementPinHandler();
    evt.target.parentNode.classList.add('pin--active');
    evt.target.setAttribute('aria-pressed', 'true');
    panelTitle.src = evt.target.src;
    panel.classList.remove('invisible');
    panelClose.setAttribute('aria-pressed', 'false');
  };

  element.addEventListener('click', elementHandler);
  element.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      elementHandler(evt);
    }
  });

  panelClose.addEventListener('click', function () {
    elementPinHandler();
    panel.classList.add('invisible');
  });
  panelClose.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      elementPinHandler();
      panel.classList.add('invisible');
      panelClose.setAttribute('aria-pressed', 'true');
    }
  });
});
/* function (element, panel) {
  var ENTER_KEY_CODE = 13;
  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
  var panelTitle = panel.querySelector('img');
  var panelClose = panel.querySelector('.dialog__close');

  var elementPinHandler = function () {
    var pinActiveElement = element.querySelector('.pin--active');
    if (pinActiveElement) {
      var imgPinActiveElement = pinActiveElement.querySelector('img');
      pinActiveElement.classList.remove('pin--active');
      imgPinActiveElement.setAttribute('aria-pressed', 'false');
    }
  };
  var elementHandler = function (evt) {
    elementPinHandler();
    evt.target.parentNode.classList.add('pin--active');
    evt.target.setAttribute('aria-pressed', 'true');
    panelTitle.src = evt.target.src;
    panel.classList.remove('invisible');
    panelClose.setAttribute('aria-pressed', 'false');
  };

  element.addEventListener('click', elementHandler);
  element.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      elementHandler(evt);
    }
  });

  panelClose.addEventListener('click', function () {
    elementPinHandler();
    panel.classList.add('invisible');
  });
  panelClose.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      elementPinHandler();
      panel.classList.add('invisible');
      panelClose.setAttribute('aria-pressed', 'true');
    }
  });
};
*/
