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
} // accordion summary


if (document.querySelector('.accordion')) {
  (function () {
    var accordionClose = function accordionClose(accordion) {
      var toggleButton = accordion.querySelector('.accordion__toggle');
      var content = accordion.querySelector('.accordion__content');
      var styles = getComputedStyle(document.documentElement);
      var transitionDelay = styles.getPropertyValue('--transition-delay');
      toggleButton.setAttribute('aria-label', 'Показать.');
      toggleButton.setAttribute('aria-expanded', false);
      content.classList.add('accordion__content--hidde');
      setTimeout(function () {
        accordion.classList.add('accordion--hidde');
      }, transitionDelay);
    };

    var accordionOpen = function accordionOpen(accordion) {
      var toggleButton = accordion.querySelector('.accordion__toggle');
      var closeButton = accordion.querySelector('.accordion__close');
      var content = accordion.querySelector('.accordion__content');
      var styles = getComputedStyle(document.documentElement);
      var transitionDelay = styles.getPropertyValue('--transition-delay');
      toggleButton.setAttribute('aria-label', 'Скрыть.');
      toggleButton.setAttribute('aria-expanded', true);
      content.classList.remove('accordion__content--hidde');
      setTimeout(function () {
        accordion.classList.remove('accordion--hidde');
      }, transitionDelay);
      closeButton.addEventListener('click', function () {
        accordionClose(accordion);
      });

      if (accordion.querySelectorAll('img.video__media')) {
        accordion.querySelectorAll('.video').forEach(function (elem) {
          loaderVideo(elem);
        });
      }
    };

    // ролучаем все спойлеры
    var arraccordion = document.querySelectorAll('.accordion'); // перебираем все спойлееры для получения необходимых элементов и прослушивания событий

    var _loop = function _loop(_i2) {
      // кнопка +/-
      var toggleButton = arraccordion[_i2].querySelector('.accordion__toggle');

      if (toggleButton.getAttribute('aria-expanded') == 'false') {
        accordionClose(arraccordion[_i2]);
      }

      toggleButton.addEventListener('click', function () {
        if (toggleButton.getAttribute('aria-expanded') == 'false') {
          accordionOpen(arraccordion[_i2]);
        } else {
          accordionClose(arraccordion[_i2]);
        }
      });
    };

    for (var _i2 = 0; _i2 < arraccordion.length; _i2++) {
      _loop(_i2);
    }
  })();
} // loader video


function loaderVideo(video) {
  var videoLink = video.querySelector('.video__link');

  if (!video.querySelector('iframe.video__media')) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', videoLink.getAttribute('data-iframe'));
    iframe.classList.add('video__media');
    video.append(iframe);
  }
} // tab__label--js


if (document.querySelector('.tab__label--js')) {
  var tabLabel = document.querySelectorAll('.tab__label--js');
  var tabRadio = document.querySelectorAll('.tab__radio--js');
  tabRadio.forEach(function (radio) {
    if (radio.checked) {
      document.querySelector("[for=\"".concat(radio.id, "\"]")).classList.add('tab__label--active');
    }
  });
  tabLabel.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tab.parentNode.querySelector('.tab__label--active').classList.remove('tab__label--active');
      tab.classList.add('tab__label--active');
    });
  });
}

window.addEventListener('load', function () {
  var tabWrapLabel = document.querySelector('.tab__wrap-label');
  var courceWrapLevel = document.querySelector('.cource-wrap-level');
  var tabLabelJs = '.tab__label--js';
  tabWrapLabel.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      smoothScroll(courceWrapLevel);
    }
  });

  function currentYPosition() {
    console.log('currentYPosition'); // Firefox, Chrome, Opera, Safari

    if (self.pageYOffset) return self.pageYOffset; // Internet Explorer 6 - standards mode

    if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6, 7 and 8

    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  function elmYPosition(courceWrapLevel) {
    console.log('elmYPosition');
    var elm = courceWrapLevel;
    var y = elm.offsetTop;
    var node = elm;

    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }

    return y;
  }

  function smoothScroll(courceWrapLevel) {
    console.log('smoothScroll');
    var startY = currentYPosition();
    var stopY = elmYPosition(courceWrapLevel);
    var distance = stopY > startY ? stopY - startY : startY - stopY;

    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }

    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;

    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }

      return;
    }

    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  }
});