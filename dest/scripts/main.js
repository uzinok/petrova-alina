"use strict";

// all
// ryear
if (document.querySelector('.ryear')) {
  var spanRyear = document.querySelectorAll('.ryear');
  var date = new Date();
  var year = date.getFullYear();

  for (var i = 0; i < spanRyear.length; i++) {
    spanRyear[i].textContent = year;
  }
} // no-js


if (document.querySelector('.no-js')) {
  var listNoJs = document.querySelectorAll('.no-js');
  listNoJs.forEach(function (elem) {
    elem.classList.remove('no-js');
  });
} //
// nav


var navButtonToggle = document.querySelector('.page-header__nav-toggle');
var header = document.querySelector('.page-header');
navButtonToggle.addEventListener('click', function () {
  header.classList.toggle('page-header__open');
  header.classList.toggle('page-header--close');
}); // form
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
      if (!input.value) return input.value = input.min;
      var value = +input.value - +input.getAttribute('step');

      if (value <= +input.min) {
        return input.value = input.min;
      }

      input.value = value;
    });
  });
} // social


if (document.querySelector('.form__social--js')) {
  var wrap = document.querySelector('.form__social--js');
  var select = wrap.querySelector('select');
  var allInput = wrap.querySelectorAll('input');

  for (var _i = 0; allInput.length > _i; _i++) {
    allInput[_i].setAttribute('tabindex', -1);
  }

  var activeInput = wrap.querySelector("input[name=\"".concat(select.value, "\"]"));
  activeInput.classList.add('form__social-input--active');
  activeInput.setAttribute('tabindex', 0);
  select.addEventListener('change', function () {
    wrap.querySelector('.form__social-input--active').setAttribute('tabindex', -1);
    wrap.querySelector('.form__social-input--active').classList.remove('form__social-input--active');
    activeInput = wrap.querySelector("input[name=\"".concat(select.value, "\"]"));
    activeInput.classList.add('form__social-input--active');
    activeInput.setAttribute('tabindex', 0);
  });
} // details summary


if (document.querySelector('.details')) {
  // ролучаем все спойлеры
  var arrDetails = document.querySelectorAll('.details'); // перебираем все спойлееры для получения необходимых элементов и прослушивания событий

  for (var _i2 = 0; _i2 < arrDetails.length; _i2++) {
    var toggleButton = arrDetails[_i2].querySelector('.details__toggle');

    if (toggleButton.getAttribute('aria-expanded') == 'false') {
      arrDetails[_i2].classList.add('details--hidde');

      toggleButton.setAttribute('aria-label', 'Показать.');
    } else {
      toggleButton.setAttribute('aria-label', 'Скрыть.');
    }

    arrDetails[_i2].querySelector('.details__toggle').addEventListener('click', function () {
      var _this = this;

      var content = this.parentNode.parentNode.querySelector('.details__content');
      content.classList.remove('details__content--hidde');
      setTimeout(function () {
        console.log(content);

        _this.parentNode.parentNode.classList.toggle('details--hidde');
      }, 10);

      if (this.getAttribute('aria-expanded') == 'true') {
        this.setAttribute('aria-expanded', false);
        this.setAttribute('aria-label', 'Показать.');
        setTimeout(function () {
          console.log(content);
          content.classList.toggle('details__content--hidde');
        }, 200);
        return;
      }

      this.setAttribute('aria-expanded', true);
      this.setAttribute('aria-label', 'Скрыть.');
    });
  }
}