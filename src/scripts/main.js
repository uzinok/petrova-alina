// all

const BODY = document.body;

// ryear
if (document.querySelector('.ryear')) {
	let spanRyear = document.querySelectorAll('.ryear');

	let date = new Date();
	let year = date.getFullYear();

	for (let i = 0; i < spanRyear.length; i++) {

		spanRyear[i].textContent = year;
	}
}

// nav
const navButtonToggle = document.querySelector('.page-header__nav-toggle');
const header = document.querySelector('.page-header');

navButtonToggle.addEventListener('click', function () {
	BODY.classList.toggle('nav-no-scroll');
	header.classList.toggle('page-header__open-toggle');
})

console.log(navButtonToggle);
console.log(BODY);
console.log(header);

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
			console.log(!input.value);
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
	let activeInput = wrap.querySelector(`input[name="${select.value}"]`);

	activeInput.classList.add('form__social-input--active');

	select.addEventListener('change', () => {
		wrap.querySelector('.form__social-input--active').classList.remove('form__social-input--active');
		activeInput = wrap.querySelector(`input[name="${select.value}"]`);
		activeInput.classList.add('form__social-input--active');
	})
}
