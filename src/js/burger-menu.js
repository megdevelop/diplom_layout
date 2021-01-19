const buttonMenuElem = document.querySelector('.js-burger-menu__button');
const linksElem = document.querySelectorAll('.js-inline-nav__link');
const overlayElem = document.querySelector('.js-burger-menu__overlay');
const bodyElem = document.querySelector('body');
const menuElem = document.querySelector('.js-menu');

buttonMenuElem.addEventListener('click', () => {
	bodyElem.classList.toggle('burger-menu-active');
});

overlayElem.addEventListener('click', () => {
	bodyElem.classList.toggle('burger-menu-active');
});

linksElem.forEach(elem => elem.addEventListener('click', () => {
		bodyElem.classList.remove('burger-menu-active');
}));

window.onkeydown = function( event ) {
    if ( event.keyCode == 27 ) {
        bodyElem.classList.remove('burger-menu-active');
    }
};

