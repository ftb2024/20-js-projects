const menuBars = document.getElementById('menu-bars'),
	overlay = document.getElementById('overlay'),
	navItems = [];

function getElemById(name) {
	for(let i = 1; i <= 5; i++) {
		navItems.push(document.getElementById(`${name}-${i}`));
	}
}
getElemById('nav');

function toggleNav() {
	// Menu Bars: Open/Close
	// метод toggle позволяет удалить или добавить класс "change"
	menuBars.classList.toggle('change');

	// Toggle: Menu active
	overlay.classList.toggle('overlay-active');
	if(overlay.classList.contains('overlay-active')) {
		// Animate In - Overlay
		overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

		// Animate In - Menu Items
		// remRep(false);
		remRepV2('out', 'in');
	} else {
		// Animate Out - Overlay
		overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

		// Animate Out - Menu Items
		// remRep(true);
		remRepV2('in', 'out');
	}
}

// functions remRep and remRepV2 do the same thing
function remRep(willOut) {
	navItems.forEach((navItem, i) => {
		willOut ? navItem.classList.replace(`slide-in-${i+1}`, `slide-out-${i+1}`)
			: navItem.classList.replace(`slide-out-${i+1}`, `slide-in-${i+1}`)
	});
}

function remRepV2(remove, add) {
	navItems.forEach((navItem, index) => {
		navItem.classList.replace(`slide-${remove}-${index+1}`, `slide-${add}-${index+1}`)
	});
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((navItem) => {
	navItem.addEventListener('click', toggleNav);
});
