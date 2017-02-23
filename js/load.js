'use strict';
window.load = (function (url, onLoad) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load',function (evt) {
    if (evt.target.readyState === 4) {
      onLoad(evt.target.response);
      };
  });
  xhr.open('GET', url);
  xhr.send();
  });
