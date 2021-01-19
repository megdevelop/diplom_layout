let anchorsElem = document.querySelectorAll('.js-nav-link');
let anchor
let anchorId

for (anchor of anchorsElem) {
	if (anchor) {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			anchorId = this.getAttribute('href');
			document.querySelector(anchorId).scrollIntoView({
				behavior: 'smooth', block: 'start'
			})
		})
	}
}