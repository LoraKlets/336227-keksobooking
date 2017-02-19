'use strict';
window.synchronizeFields = (function (elem1, elem2, valuesElem1, valuesElem2, syncValues) {
  elem1.addEventListener('click', function () {
    var getIndexValue = function () {
      for (var i = 0; i < valuesElem1.length; i++) {
        if (elem1.value === valuesElem1[i]) {
          break;
        }
      }
      return i;
    };
    if (typeof syncValues === 'function') {
      syncValues(elem2, valuesElem2[getIndexValue()]);
    };
  });

});
  /*
  elem1.addEventListener('click', function () {
    elem2[propertyElem2] = valuesElem2[getIndexValue()];
    if (propertyElem2 === 'min') {
      elem2.value = elem2.min;
    }
  });
*/
