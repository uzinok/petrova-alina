// all
// ryear
if (document.querySelector('.ryear')) {
	let spanRyear = document.querySelectorAll('.ryear');

	let date = new Date();
	let year = date.getFullYear();

	for (let i = 0; i < spanRyear.length; i++) {

		spanRyear[i].textContent = year;
	}
}

// no-js
if (document.querySelector('.no-js')) {
	const listNoJs = document.querySelectorAll('.no-js');

	listNoJs.forEach(elem => {
		elem.classList.remove('no-js');
	});
}

//

// nav
const navButtonToggle = document.querySelector('.page-header__nav-toggle');
const header = document.querySelector('.page-header');

navButtonToggle.addEventListener('click', function() {
	header.classList.toggle('page-header__open');
	header.classList.toggle('page-header--close');
});

// form
// select
if (document.querySelectorAll('.form__select-icon--js')) {
	const selectIcon = document.querySelectorAll('.form__select-icon--js');

	selectIcon.forEach(elem => {
		setIconSelect(elem);
	});

	function setIconSelect(elem) {
		elem.classList.add('form__select-icon');
		addDataIcon(elem);

		elem.addEventListener('change', () => {
			addDataIcon(elem);
		});
	}

	function addDataIcon(elem) {
		return elem.dataset.icon = elem.querySelector('select').value.toLowerCase();
	}
}

// input password
if (document.querySelectorAll('.form__password--js')) {
	const arrInputPassword = document.querySelectorAll('.form__password--js');

	arrInputPassword.forEach(elem => {
		const button = elem.querySelector('button');
		const input = elem.querySelector('input');

		button.removeAttribute('style');

		button.addEventListener('click', function() {
			this.classList.toggle('form__password-toggle--visible')
			if (input.type == 'password')
				return input.setAttribute('type', 'text');
			return input.setAttribute('type', 'password');
		})
	});
}

// input number
if (document.querySelector('.form__number-wrap--js')) {
	const numberWrap = document.querySelectorAll('.form__number-wrap--js');

	numberWrap.forEach(elem => {
		elem.classList.add('form__number-wrap');
		const input = elem.querySelector('input');
		const plus = elem.querySelector('.form__button-plus');
		const minus = elem.querySelector('.form__button-minus');
		plus.removeAttribute('style');
		minus.removeAttribute('style');

		plus.addEventListener('click', () => {
			if (!input.value)
				return input.value = input.min;
			const value = +input.value + +input.getAttribute('step');

			if (value >= +input.max) {
				return input.value = input.max;
			}
			input.value = value;
		});

		minus.addEventListener('click', () => {
			if (!input.value)
				return input.value = input.min;
			const value = +input.value - +input.getAttribute('step');

			if (value <= +input.min) {
				return input.value = input.min;
			}
			input.value = value;
		});
	});
}

// social
if (document.querySelector('.form__social--js')) {
	const wrap = document.querySelector('.form__social--js');
	const select = wrap.querySelector('select');
	const allInput = wrap.querySelectorAll('input');
	for (let i = 0; allInput.length > i; i++) {
		allInput[i].setAttribute('tabindex', -1);
	}

	let activeInput = wrap.querySelector(`input[name="${select.value}"]`);

	activeInput.classList.add('form__social-input--active');
	activeInput.setAttribute('tabindex', 0);

	select.addEventListener('change', () => {
		wrap.querySelector('.form__social-input--active').setAttribute('tabindex', -1);
		wrap.querySelector('.form__social-input--active').classList.remove('form__social-input--active');
		activeInput = wrap.querySelector(`input[name="${select.value}"]`);
		activeInput.classList.add('form__social-input--active');
		activeInput.setAttribute('tabindex', 0);
	})
}

// accordion summary

if (document.querySelector('.accordion')) {
	// ролучаем все спойлеры

	let arraccordion = document.querySelectorAll('.accordion');


	// перебираем все спойлееры для получения необходимых элементов и прослушивания событий
	for (let i = 0; i < arraccordion.length; i++) {
		// кнопка +/-
		const toggleButton = arraccordion[i].querySelector('.accordion__toggle');

		if (toggleButton.getAttribute('aria-expanded') == 'false') {
			accordionClose(arraccordion[i]);
		}

		toggleButton.addEventListener('click', function() {
			if (toggleButton.getAttribute('aria-expanded') == 'false') {
				accordionOpen(arraccordion[i]);
			} else {
				accordionClose(arraccordion[i]);
			}
		});
	}

	function accordionClose(accordion) {
		const toggleButton = accordion.querySelector('.accordion__toggle');
		const content = accordion.querySelector('.accordion__content');

		const styles = getComputedStyle(document.documentElement);
		const transitionDelay = styles.getPropertyValue('--transition-delay');

		toggleButton.setAttribute('aria-label', 'Показать.');
		toggleButton.setAttribute('aria-expanded', false);
		content.classList.add('accordion__content--hidde');
		setTimeout(() => {
			accordion.classList.add('accordion--hidde');
		}, transitionDelay);
	}

	function accordionOpen(accordion) {
		const toggleButton = accordion.querySelector('.accordion__toggle');
		const closeButton = accordion.querySelector('.accordion__close');
		const content = accordion.querySelector('.accordion__content');

		const styles = getComputedStyle(document.documentElement);
		const transitionDelay = styles.getPropertyValue('--transition-delay');

		toggleButton.setAttribute('aria-label', 'Скрыть.');
		toggleButton.setAttribute('aria-expanded', true);

		content.classList.remove('accordion__content--hidde');
		setTimeout(() => {
			accordion.classList.remove('accordion--hidde');
		}, transitionDelay);

		closeButton.addEventListener('click', () => {
			accordionClose(accordion);
		});

		if (accordion.querySelectorAll('img.video__media')) {
			accordion.querySelectorAll('.video').forEach(elem => {
				loaderVideo(elem);
			});
		}
	}
}

// loader video

function loaderVideo(video) {
	const videoLink = video.querySelector('.video__link');

	if (!video.querySelector('iframe.video__media')) {
		const iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', videoLink.getAttribute('data-iframe'));
		iframe.classList.add('video__media');
		video.append(iframe);
	}
}

// tab__label--js

if (document.querySelector('.tab__label--js')) {
	const tabLabel = document.querySelectorAll('.tab__label--js');
	const tabRadio = document.querySelectorAll('.tab__radio--js');

	tabRadio.forEach(radio => {
		if (radio.checked) {
			document.querySelector(`[for="${radio.id}"]`).classList.add('tab__label--active');
		}
	});

	tabLabel.forEach(tab => {
		tab.addEventListener('click', () => {
			tab.parentNode.querySelector('.tab__label--active').classList.remove('tab__label--active');
			tab.classList.add('tab__label--active');
		})
	});
}

window.addEventListener('load', function() {


	const tabWrapLabel = document.querySelector('.tab__wrap-label');
	const courceWrapLevel = document.querySelector('.cource-wrap-level');
	const tabLabelJs = '.tab__label--js';

	tabWrapLabel.addEventListener('click', () => {
		if (window.innerWidth <= 768) {
			smoothScroll(courceWrapLevel);
		}
	})

	function currentYPosition() {
		console.log('currentYPosition');
		// Firefox, Chrome, Opera, Safari
		if (self.pageYOffset) return self.pageYOffset;
		// Internet Explorer 6 - standards mode
		if (document.documentElement && document.documentElement.scrollTop)
			return document.documentElement.scrollTop;
		// Internet Explorer 6, 7 and 8
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
