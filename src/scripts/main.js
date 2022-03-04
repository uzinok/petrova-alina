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

window.addEventListener('load', () => {
	if (document.querySelectorAll('.form__select-icon--js')) {
		const selectIcon = document.querySelectorAll('.form__select-icon--js');
		selectIcon.forEach(elem => {
			setIconSelect(elem);
		})
	}
})
