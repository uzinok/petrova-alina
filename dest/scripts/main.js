"use strict";

function setIconSelect(elem) {
  elem.classList.add('form__select-icon');
  addDataIcon(elem);
  elem.addEventListener('change', function () {
    addDataIcon(elem);
  });
}

function addDataIcon(elem) {
  return elem.dataset.icon = elem.querySelector('select').value.toLowerCase();
}

window.addEventListener('load', function () {
  if (document.querySelectorAll('.form__select-icon--js')) {
    var selectIcon = document.querySelectorAll('.form__select-icon--js');
    selectIcon.forEach(function (elem) {
      setIconSelect(elem);
    });
  }
});