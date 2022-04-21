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

// details summary

if (document.querySelector('.details')) {
	// ролучаем все спойлеры

	let arrDetails = document.querySelectorAll('.details');


	// перебираем все спойлееры для получения необходимых элементов и прослушивания событий
	for (let i = 0; i < arrDetails.length; i++) {
		// кнопка +/-
		const toggleButton = arrDetails[i].querySelector('.details__toggle');

		if (toggleButton.getAttribute('aria-expanded') == 'false') {
			detailsClose(arrDetails[i]);
		}

		toggleButton.addEventListener('click', function() {
			if (toggleButton.getAttribute('aria-expanded') == 'false') {
				detailsOpen(arrDetails[i]);
			} else {
				detailsClose(arrDetails[i]);
			}
		});
	}

	function detailsClose(details) {
		const toggleButton = details.querySelector('.details__toggle');
		const content = details.querySelector('.details__content');

		const styles = getComputedStyle(document.documentElement);
		const transitionDelay = styles.getPropertyValue('--transition-delay');

		toggleButton.setAttribute('aria-label', 'Показать.');
		toggleButton.setAttribute('aria-expanded', false);
		content.classList.add('details__content--hidde');
		setTimeout(() => {
			details.classList.add('details--hidde');
		}, transitionDelay);
	}

	function detailsOpen(details) {
		const toggleButton = details.querySelector('.details__toggle');
		const closeButton = details.querySelector('.details__close');
		const content = details.querySelector('.details__content');

		const styles = getComputedStyle(document.documentElement);
		const transitionDelay = styles.getPropertyValue('--transition-delay');

		toggleButton.setAttribute('aria-label', 'Скрыть.');
		toggleButton.setAttribute('aria-expanded', true);

		content.classList.remove('details__content--hidde');
		setTimeout(() => {
			details.classList.remove('details--hidde');
		}, transitionDelay);

		closeButton.addEventListener('click', () => {
			detailsClose(details);
		});

		if (details.querySelectorAll('img.video__media')) {
			details.querySelectorAll('.video').forEach(elem => {
				loaderVideo(elem);
			});
		}
	}
	// for (let i = 0; i < arrDetails.length; i++) {
	// 	const toggleButton = arrDetails[i].querySelector('.details__toggle');

	// 	if (toggleButton.getAttribute('aria-expanded') == 'false') {
	// 		arrDetails[i].classList.add('details--hidde');
	// 		toggleButton.setAttribute('aria-label', 'Показать.');
	// 	} else {
	// 		toggleButton.setAttribute('aria-label', 'Скрыть.');
	// 	}

	// 	arrDetails[i].querySelector('.details__toggle').addEventListener('click', function() {
	// 		const content = this.parentNode.parentNode.querySelector('.details__content');
	// 		content.classList.remove('details__content--hidde');

	// 		const styles = getComputedStyle(document.documentElement);
	// 		const transitionDelay = styles.getPropertyValue('--transition-delay');

	// 		setTimeout(() => {
	// 			this.parentNode.parentNode.classList.toggle('details--hidde');
	// 		}, transitionDelay);

	// 		if (this.getAttribute('aria-expanded') == 'true') {
	// 			this.setAttribute('aria-expanded', false);
	// 			this.setAttribute('aria-label', 'Показать.');

	// 			setTimeout(() => {
	// 				content.classList.toggle('details__content--hidde');
	// 			}, transitionDelay);
	// 			return;
	// 		}

	// 		this.setAttribute('aria-expanded', true);
	// 		this.setAttribute('aria-label', 'Скрыть.');

	// 		if (arrDetails[i].querySelectorAll('img.video__media')) {
	// 			arrDetails[i].querySelectorAll('.video').forEach(elem => {
	// 				loaderVideo(elem);
	// 			});
	// 		}
	// 	});
	// }
}

// loader video

function loaderVideo(video) {
	const videoLink = video.querySelector('.video__link');

	if (videoLink) {
		const iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', videoLink.getAttribute('data-iframe'));
		iframe.classList.add('video__media');
		video.append(iframe);

		videoLink.remove();
	}
}
