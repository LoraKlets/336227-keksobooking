'use strict';
window.dialogHandle = (function () {
  var dialog = document.querySelector('.dialog');
  var pinDialogClose = dialog.querySelector('.dialog__close');
  var onDialogClose;
  var ESCAPE_KEY_CODE = 27;

  var dialogKeydownHandler = function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      dialog.classList.add('invisible');
    }
  };

  var dialogOpen = function () {
    dialog.classList.remove('invisible');
    document.addEventListener('keydown', dialogKeydownHandler);
  };

  var dialogClose = function () {
    dialog.classList.add('invisible');
    document.removeEventListener('keydown', dialogKeydownHandler);
    var pinActiveElement = document.querySelector('.pin--active');
    if (pinActiveElement) {
      pinActiveElement.classList.remove('pin--active');
      pinActiveElement.children[0].setAttribute('aria-pressed', 'false');
    }
  };

  var onKeyDown = function (evt) {
    if (window.initializePins.isActivateEvent(evt)) {
      if (typeof onDialogClose === 'function') {
        onDialogClose();
      }
      dialogClose();
    }
  };
  return {
    openDialog: function (onDialogCl) {
      dialogOpen();
      pinDialogClose.addEventListener('keydown', onKeyDown);
      pinDialogClose.addEventListener('click', dialogClose);
      onDialogClose = onDialogCl;
    },
    closeDialog: dialogClose
    };
})();
