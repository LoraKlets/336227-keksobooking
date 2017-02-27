'use strict';
window.form = (function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  var rentTitle = document.querySelector('#title');
  rentTitle.required = true;
  rentTitle.maxLength = 100;
  // минимальная длина объявления проверяется с помощью  pattern="[\s\S]{30,} в поле <input id="title" >

  var rentAddress = document.querySelector('#address');
  rentAddress.required = true;

  var rentPrice = document.querySelector('#price');
  rentPrice.required = true;
  rentPrice.max = 1000000;
  rentPrice.min = 1000;

  var syncValues = function (element, value) {
    element.value = value;
  };
  // синхронизация времени заезда и выезда двусторонняя - вызываем дважды
  window.synchronizeFields(document.querySelector('#time'), document.querySelector('#timeout'), ['12', '13', '14'], ['12', '13', '14'], syncValues);
  window.synchronizeFields(document.querySelector('#timeout'), document.querySelector('#time'), ['12', '13', '14'], ['12', '13', '14'], syncValues);
  // синхронизируем количество комнат и число гостей
  window.synchronizeFields(document.querySelector('#room_number'), document.querySelector('#capacity'), ['1', '2', '3'], ['не для гостей', 'для 3 гостей', 'для 3 гостей'], syncValues);

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  window.synchronizeFields(document.querySelector('#type'), document.querySelector('#price'), ['квартира', 'лачуга', 'дворец'], ['1000', '0', '10000'], syncValueWithMin);
})();
