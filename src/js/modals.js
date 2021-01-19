const btnsElem = document.querySelectorAll('.js-btn');
const formLabelMin = document.querySelector('.js-form__text-min');
const formInputMin = document.querySelector('.js-form__input-min');
const modalOverlayElem = document.querySelector('.js-modals__modal-overlay');
const modalsElem = document.querySelectorAll('.js-modals__modal');
const checkbox = document.querySelectorAll('.js-checkbox');
const submit = document.querySelectorAll('.js-form__submit');
const btnCloseElem = document.querySelector('.modals__btn-close');
const formElem = document.querySelectorAll('.form');
const body = document.body;

function focusClose() {
	btnCloseElem.focus();
}

function focusOpen() {
	document.querySelector('.js-open-modal').focus();

	document.querySelector('.js-open-modal').classList.remove('js-open-modal');
}

btnsElem.forEach((el) => {
	el.addEventListener('click', (e) => {
		setTimeout(focusClose, 100);

		el.classList.add('js-open-modal');

		body.classList.add('modal-active');

		if(el.classList.contains('js-btn_small')) {
			formLabelMin.classList.add('visually-hidden');
			formInputMin.classList.add('visually-hidden');
		}
	});
});

checkbox.forEach((el) => {
	el.addEventListener('change', (e) => {
			submit.forEach((el) => {
				el.toggleAttribute('disabled');
			});
	});
});

btnCloseElem.addEventListener('click', (e) => {

	body.classList.remove('modal-active');

	formElem.forEach((el) => {
		el.reset();
	});

	formLabelMin.classList.remove('visually-hidden');
	formInputMin.classList.remove('visually-hidden');

	focusOpen();
});

modalOverlayElem.addEventListener('click', (e) => {

	body.classList.remove('modal-active');

	formElem.forEach((el) => {
		el.reset();
	});

	formLabelMin.classList.remove('visually-hidden');
	formInputMin.classList.remove('visually-hidden');

	focusOpen();
});

document.body.addEventListener('keyup', function (e) {
	const key = e.keyCode;

    if (key == 27) {
        body.classList.remove('modal-active');
	
		formElem.forEach((el) => {
			el.reset();
		});

	formLabelMin.classList.remove('visually-hidden');
	formInputMin.classList.remove('visually-hidden');

		focusOpen();
    };
}, false);
