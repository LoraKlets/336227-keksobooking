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
    // window.showCard();
  };
  var dialogClose = function () {
    dialog.classList.add('invisible');
    document.removeEventListener('keydown', dialogKeydownHandler);


    if (typeof onDialogClose === 'function') {
      onDialogClose();
    }
    window.initializePins.pinActiveRemove();
  };
  var onKeyDown = function (evt) {
    if (window.initializePins.isActivateEvent(evt)) {
      dialogClose();
    }
  };
  return {openDialog: function (cb) {
    dialogOpen();
    pinDialogClose.addEventListener('keydown', onKeyDown);
    pinDialogClose.addEventListener('click', dialogClose);
    onDialogClose = cb;
  },
  dialogClose:dialogClose
  };
})();
