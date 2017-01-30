'use strict';
// При нажатии на элемент .pin ему будет добавляться класс .pin--active
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');

var pinClickHandler = function () {
  var pinActiveElement = tokyoPinMap.querySelector('.pin--active');
  if (pinActiveElement) {
      pinActiveElement.classList.remove('pin--active');
    }
  this.classList.add('pin--active');
  dialog.classList.remove('invisible');
};
var dialogHandler = function () {
  var pinActiveElement = tokyoPinMap.querySelector('.pin--active');
  var activeImg = pinActiveElement.querySelector('img');
  var dialogTitle = dialog.querySelector('img');
  dialogTitle.src = activeImg.src;
};
var pinElements = tokyoPinMap.querySelectorAll('.pin');
for (var i = 0; i < pinElements.length; i++) {
  pinElements[i].addEventListener('click', pinClickHandler);
  pinElements[i].addEventListener('click', dialogHandler);
};
var dialogClose = dialog.querySelector('.dialog__close');
dialogClose.addEventListener('click', function () {
  var pinActiveElement = tokyoPinMap.querySelector('.pin--active');
  pinActiveElement.classList.remove('pin--active');
  dialog.classList.add('invisible');
});
var rentTitle = document.querySelector('#title');
rentTitle.required = true;
rentTitle.maxLength = 100;

var rentAddress = document.querySelector('#address');
rentAddress.required = true;

var rentPrice = document.querySelector('#price');
rentPrice.required = true;
rentPrice.max = 1000000;
rentPrice.min = 1000;

var timeIn = document.querySelector('#time');
var timeOut = document.querySelector('#timeout');
timeIn.addEventListener('click', function () {
  for (i = 0; i < timeIn.options.length; i++) {
      if (timeIn.options[i].selected) {
          timeOut.options[i].selected = true;
        } else {
          timeOut.options[i].selected = false;
        }
    }
});

var rentType = document.querySelector('#type');
// синхронизируем тип жилья и минимальную цену в поле rentPrice
rentType.addEventListener('click', function () {
  var rentTypeSelectedIndex = rentType.selectedIndex;
  if (rentTypeSelectedIndex===0) { rentPrice.value = '1000'; }
  if (rentTypeSelectedIndex===1) { rentPrice.value = '0'; }
  if (rentTypeSelectedIndex===2) { rentPrice.value = '10000'; }
});
var roomNumber = document.querySelector('#room_number');
var capacityRoom = document.querySelector('#capacity');
roomNumber.addEventListener('click', function () {
  var roomSelected = roomNumber.selectedIndex;
  if (roomSelected == 0) { capacityRoom.selectedIndex = 1;
    } else {
      capacityRoom.selectedIndex = 0;
    }
});
