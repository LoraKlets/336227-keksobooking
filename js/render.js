'use strict';
window.render = (function () {
  var pinTemplate = document.querySelector('#pin-template');
  var pinToClone = pinTemplate.content.querySelector('.pin');
  return function (pin, n) {

    var pinElement = pinToClone.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.classList.add('new');

    var imgElement = pinElement.children[0];
    imgElement.src = pin.author.avatar;
    imgElement.setAttribute('id', n);
    imgElement.setAttribute('tabindex', 1);
    imgElement.setAttribute('role', 'button');
    imgElement.setAttribute('aria-pressed', 'false');

    return pinElement;
  };
})();
