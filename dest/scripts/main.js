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
  header.classList.toggle('page-header__close');
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


if (document.querySelector('details')) {
  // добавим стили для анимации
  var styleD = document.createElement('style');
  styleD.innerHTML = '.details_content{overflow:hidden;opacity:0;max-height:0;-webkit-transition:max-height var(--transition),opacity var(--transition);-o-transition:max-height var(--transition),opacity var(--transition);transition:max-height var(--transition),opacity var(--transition)}.details-visible .details_content{overflow:auto;opacity:1;max-height:190px}.details_h .details_content{display:none}details>button{border-radius:none;border:0;-webkit-box-shadow:none;box-shadow:none;background:0 0;font-family:none;font-size:none;padding:0;text-align:inherit}'; // добавим стили в head

  document.head.appendChild(styleD); // ролучаем все спойлеры

  var arrDetails = document.querySelectorAll('details'); // перебираем все спойлееры для получения необходимых элементов и прослушивания событий

  for (var _i2 = 0; _i2 < arrDetails.length; _i2++) {
    // по кнопке summary будем отслеживать клик
    var elemSummary = void 0; // если summary отсутствует - добавляем

    if (!arrDetails[_i2].querySelector('summary')) {
      // если нет поддержки details
      if (!('open' in arrDetails[_i2])) // создаем кнопку
        elemSummary = document.createElement('button');else // или содаем summary
        elemSummary = document.createElement('summary'); // добавим текст по умолчанию

      elemSummary.innerHTML = 'подробнее'; // добавляем текущему спойлеру

      arrDetails[_i2].insertBefore(elemSummary, arrDetails[_i2].querySelector('.details_content'));
    } // если summary есть - получаем
    else {
      elemSummary = arrDetails[_i2].querySelector('summary'); // если нет поддержки details

      if (!('open' in arrDetails[_i2])) {
        // тут необходимо вместо summary сделать button
        var button = document.createElement('button'); // перенесли текст

        button.innerHTML = elemSummary.innerHTML; // перенесли классы

        button.setAttribute('class', elemSummary.getAttribute('class')); // elemSummary = button;
        // добавили в спойлер кнопку

        arrDetails[_i2].insertBefore(button, elemSummary); // удалили старый summary


        arrDetails[_i2].removeChild(elemSummary);

        elemSummary = button;
      }
    } // если спойлер открыт


    if (arrDetails[_i2].hasAttribute('open')) {
      // добавляем класс спойлеру что бы контент был виден
      arrDetails[_i2].classList.add('details-visible');
    } // для старых браузеров скрываем контент что бы не было доступа к интерактивным элементам
    else if (!('open' in arrDetails[_i2])) {
      arrDetails[_i2].classList.add('details_h');
    } // отслеживаем клик


    elemSummary.addEventListener('click', function (event) {
      console.dir(event.target.nodeName == 'INPUT');
      if (event.target.nodeName == 'INPUT') return; // получаем родительский блок

      var parentBlock = this.parentNode; // если открыт спойлер

      if (parentBlock.classList.contains('details-visible')) {
        // отменяем действие по умолчанию для браузеров поддерживоющих <details>
        event.preventDefault(); // с анимацией скрываем контент

        parentBlock.classList.remove('details-visible'); // после завершения анимации

        setTimeout(function () {
          if (!('open' in parentBlock)) // для старых браузеров скрываем контент что бы не было доступа к интерактивным элементам
            parentBlock.classList.add('details_h');else // для новых - удаляем атрибут open
            parentBlock.open = false;
        }, 200);
      } // если спойлер закрыт
      else {
        // для старых браузеров удаляем display none для контента
        parentBlock.classList.remove('details_h'); // через минимальный промежуток времени запускаем анимацию css появления контента

        setTimeout(function () {
          parentBlock.classList.add('details-visible');
        }, 5);
      }
    });
  }
}