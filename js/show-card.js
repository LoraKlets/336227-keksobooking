'use strict';
window.showCard = (function () {
  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('img');
  var activePin = document.querySelector('.pin--active');
  var imgActivePin = activePin.querySelector('img');
  dialogTitle.src = imgActivePin.src;
});
