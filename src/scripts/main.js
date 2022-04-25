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

		toggleButton.addEventListener('click', function () {
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
