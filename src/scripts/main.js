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
	header.classList.toggle('page-header__close');
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

if (document.querySelector('details')) {
	// добавим стили для анимации
	let styleD = document.createElement('style');
	styleD.innerHTML = '.details_content{overflow:hidden;opacity:0;max-height:0;-webkit-transition:max-height var(--transition),opacity var(--transition);-o-transition:max-height var(--transition),opacity var(--transition);transition:max-height var(--transition),opacity var(--transition)}.details-visible .details_content{overflow:auto;opacity:1;max-height:190px}.details_h .details_content{display:none}details>button{border-radius:none;border:0;-webkit-box-shadow:none;box-shadow:none;background:0 0;font-family:none;font-size:none;padding:0;text-align:inherit}';
	// добавим стили в head
	document.head.appendChild(styleD);
	// ролучаем все спойлеры

	let arrDetails = document.querySelectorAll('details');

	// перебираем все спойлееры для получения необходимых элементов и прослушивания событий
	for (let i = 0; i < arrDetails.length; i++) {

		// по кнопке summary будем отслеживать клик
		let elemSummary;
		// если summary отсутствует - добавляем
		if (!(arrDetails[i].querySelector('summary'))) {
			// если нет поддержки details
			if (!('open' in arrDetails[i]))
				// создаем кнопку
				elemSummary = document.createElement('button');
			else
				// или содаем summary
				elemSummary = document.createElement('summary');
			// добавим текст по умолчанию
			elemSummary.innerHTML = 'подробнее';
			// добавляем текущему спойлеру
			arrDetails[i].insertBefore(elemSummary, arrDetails[i].querySelector('.details_content'))
		}
		// если summary есть - получаем
		else {
			elemSummary = arrDetails[i].querySelector('summary');
			// если нет поддержки details
			if (!('open' in arrDetails[i])) {
				// тут необходимо вместо summary сделать button
				let button = document.createElement('button');
				// перенесли текст
				button.innerHTML = elemSummary.innerHTML;
				// перенесли классы
				button.setAttribute('class', elemSummary.getAttribute('class'));
				// elemSummary = button;
				// добавили в спойлер кнопку
				arrDetails[i].insertBefore(button, elemSummary);
				// удалили старый summary
				arrDetails[i].removeChild(elemSummary);

				elemSummary = button;
			}
		}

		// если спойлер открыт
		if (arrDetails[i].hasAttribute('open')) {
			// добавляем класс спойлеру что бы контент был виден
			arrDetails[i].classList.add('details-visible');
		}
		// для старых браузеров скрываем контент что бы не было доступа к интерактивным элементам
		else if (!('open' in arrDetails[i])) {
			arrDetails[i].classList.add('details_h');
		}

		// отслеживаем клик
		elemSummary.addEventListener('click', function (event) {
			console.dir(event.target.nodeName == 'INPUT');

			if (event.target.nodeName == 'INPUT') return;

			// получаем родительский блок
			let parentBlock = this.parentNode;

			// если открыт спойлер
			if (parentBlock.classList.contains('details-visible')) {
				// отменяем действие по умолчанию для браузеров поддерживоющих <details>
				event.preventDefault();
				// с анимацией скрываем контент
				parentBlock.classList.remove('details-visible');

				// после завершения анимации
				setTimeout(function() {
					if (!('open' in parentBlock))
						// для старых браузеров скрываем контент что бы не было доступа к интерактивным элементам
						parentBlock.classList.add('details_h');
					else
						// для новых - удаляем атрибут open
						parentBlock.open = false;
				}, 200)
			}
			// если спойлер закрыт
			else {
				// для старых браузеров удаляем display none для контента
				parentBlock.classList.remove('details_h');
				// через минимальный промежуток времени запускаем анимацию css появления контента
				setTimeout(function() {
					parentBlock.classList.add('details-visible');
				}, 5)
			}
		})
	}
}
