"use strict";

// form
// select
if (document.querySelectorAll('.form__select-icon--js')) {
  var setIconSelect = function setIconSelect(elem) {
    elem.classList.add('form__select-icon');
    addDataIcon(elem);
    elem.addEventListener('change', function () {
      addDataIcon(elem);
    });
  };

  var addDataIcon = function addDataIcon(elem) {
    return elem.dataset.icon = elem.querySelector('select').value.toLowerCase();
  };

  var selectIcon = document.querySelectorAll('.form__select-icon--js');
  selectIcon.forEach(function (elem) {
    setIconSelect(elem);
  });
} // input password


if (document.querySelectorAll('.form__password--js')) {
  var arrInputPassword = document.querySelectorAll('.form__password--js');
  arrInputPassword.forEach(function (elem) {
    var button = elem.querySelector('button');
    var input = elem.querySelector('input');
    button.removeAttribute('style');
    button.addEventListener('click', function () {
      this.classList.toggle('form__password-toggle--visible');
      if (input.type == 'password') return input.setAttribute('type', 'text');
      return input.setAttribute('type', 'password');
    });
  });
} // input number


if (document.querySelector('.form__number-wrap--js')) {
  var numberWrap = document.querySelectorAll('.form__number-wrap--js');
  numberWrap.forEach(function (elem) {
    elem.classList.add('form__number-wrap');
    var input = elem.querySelector('input');
    var plus = elem.querySelector('.form__button-plus');
    var minus = elem.querySelector('.form__button-minus');
    plus.removeAttribute('style');
    minus.removeAttribute('style');
    plus.addEventListener('click', function () {
      if (!input.value) return input.value = input.min;
      var value = +input.value + +input.getAttribute('step');

      if (value >= +input.max) {
        return input.value = input.max;
      }

      input.value = value;
    });
    minus.addEventListener('click', function () {
      console.log(!input.value);
      if (!input.value) return input.value = input.min;
      var value = +input.value - +input.getAttribute('step');

      if (value <= +input.min) {
        return input.value = input.min;
      }

      input.value = value;
    });
  });
} // all
// ryear


if (document.querySelector('.ryear')) {
  var spanRyear = document.querySelectorAll('.ryear');
  var date = new Date();
  var year = date.getFullYear();

  for (var i = 0; i < spanRyear.length; i++) {
    spanRyear[i].textContent = year;
  }
}