'use strict';
// При нажатии на элемент .pin ему будет добавляться класс .pin--active
var tokyoPinMap = document.querySelector('.tokyo__pin-map');

window.dialogHandle.openDialog(null);

tokyoPinMap.addEventListener('click', function (evt) {
  if (evt.target.parentElement.classList['value'].indexOf('new') !== -1) {
    window.initializePins.elementHandler(evt);
    window.dialogHandle.openDialog(null);
  }
});
var onDialogCb = function () {
  var activePin = tokyoPinMap.querySelector('.pin--active');
  var imgActivePin = activePin.querySelector('img');
  imgActivePin.focus();
};
tokyoPinMap.addEventListener('keydown', function (evt) {
  if (window.initializePins.isActivateEvent(evt)) {
    window.initializePins.elementHandler(evt);
    window.dialogHandle.openDialog(onDialogCb);
  }
});

var rentTitle = document.querySelector('#title');
rentTitle.required = true;
rentTitle.maxLength = 100;
// минимальная длина объявления проверяется с помощью  pattern="[\s\S]{30,} в поле <input id="title" >

var rentAddress = document.querySelector('#address');
rentAddress.required = true;
rentAddress.value = 'x: ' + window.initializePins.endCoords.x + '   y:  ' + window.initializePins.endCoords.y;

var rentPrice = document.querySelector('#price');
rentPrice.required = true;
rentPrice.max = 1000000;
rentPrice.min = 1000;


var syncValues = function (element, value) {
  element.value = value;
};
// синхронизация двусторонняя - вызываем дважды
window.synchronizeFields(document.querySelector('#time'), document.querySelector('#timeout'), ['12', '13', '14'], ['12', '13', '14'], syncValues);
window.synchronizeFields(document.querySelector('#timeout'), document.querySelector('#time'), ['12', '13', '14'], ['12', '13', '14'], syncValues);
// синхронизируем количество комнат и число гостей
window.synchronizeFields(document.querySelector('#room_number'), document.querySelector('#capacity'), ['1', '2', '3'], ['не для гостей', 'для 3 гостей', 'для 3 гостей'], syncValues);

var syncValueWithMin = function (element, value) {
  element.min = value;
};
window.synchronizeFields(document.querySelector('#type'), document.querySelector('#price'), ['квартира', 'лачуга', 'дворец'], ['1000', '0', '10000'], syncValueWithMin);
