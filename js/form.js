'use strict';
// При нажатии на элемент .pin ему будет добавляться класс .pin--active
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');

window.initializePins(tokyoPinMap, dialog);

var rentTitle = document.querySelector('#title');
rentTitle.required = true;
rentTitle.maxLength = 100;

var rentAddress = document.querySelector('#address');
rentAddress.required = true;

var rentPrice = document.querySelector('#price');
rentPrice.required = true;
rentPrice.max = 1000000;
rentPrice.min = 1000;

window.synchronizeFields(document.querySelector('#time'), document.querySelector('#timeout'), ['12', '13', '14'], ['12', '13', '14'], 'value');

window.synchronizeFields(document.querySelector('#type'), document.querySelector('#price'), ['квартира', 'лачуга', 'дворец'], ['1000', '0', '10000'], 'min');

window.synchronizeFields(document.querySelector('#room_number'), document.querySelector('#capacity'), ['1 комната', '2 комнаты', '100 комнат'], ['не для гостей', 'для 3 гостей', 'для 3 гостей'], 'value');
