const imgContainer = document.getElementById('img-container'),
	loader = document.getElementById('loader');

let photosArray = [],
	ready = false,
	imagesLoaded = 0,
	totalImages = 0;

// Unsplash API
const count = 30,
	apiKey = 'tCr8TMlBGKlOETmqR20sS36midHrZNJ-CANXqkOEs0c',
	apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch(error) {
		console.log(error);
	}
}

// Function that displays photos to the DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	photosArray.forEach((photo) => {
		// create <a> to link to Unsplash
		const a = document.createElement('a');
		// a.setAttribute('href', photo.links.html);
		// a.setAttribute('target', '_blank');
		setAttributes(a, {
			href: photo.links.html,
			target: '_blank'
		});

		// create <img> for photo
		const img = document.createElement('img');
		// img.setAttribute('src', photo.urls.regular);
		// img.setAttribute('alt', photo.alt_description);
		// img.setAttribute('title', photo.alt_description);
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});

		// Event listener to check is photo loaded
		img.addEventListener('load', imgLoaded);

		// put <img> inside <a>, then put both of them to imgContainer element
		a.appendChild(img);
		imgContainer.appendChild(a);
	});
}

// Helper function to set attributes
function setAttributes(elem, attributes) {
	for(const key in attributes) {
		elem.setAttribute(key, attributes[key]);
	}
}

// Function that ckecks were all images loaded
function imgLoaded() {
	imagesLoaded++;
	if(imagesLoaded === totalImages) {
		loader.hidden = true;
		ready = true;
	}
}

// Check if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();