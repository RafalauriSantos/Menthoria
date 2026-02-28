// Home page placeholder script
document.addEventListener('DOMContentLoaded', () => {
	// Lightweight guard to avoid 404/unused script overhead
	const hero = document.querySelector('.hero');
	if (hero) {
		// minor enhancement: announce for screen readers
		hero.setAttribute('aria-hidden', 'false');
	}
});
