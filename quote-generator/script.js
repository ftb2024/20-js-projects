const quoteContainer = document.getElementById('quote-container'),
	quoteText = document.getElementById('quote'),
	authorText = document.getElementById('author'),
	twitterBtn = document.getElementById('twitter'),
	newQuoteBtn = document.getElementById('new-quote'),
	loader = document.getElementById('loader');

// Show loading
function loading() {
	// show loader and hide quote container
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide loading and show quote container
function completed() {
	// if loader.hidden is false, show quote container and hide a loader
	if(!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get Quote from API
async function getQuote() {
	// show loader before fetching data
	loading();

	const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // to avoid CORS policy
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();

		// if Author is blank, add 'Unknown'
		if(data.quoteAuthor === '') {
			authorText.innerText = 'Unknown'
		} else {
			authorText.innerText = data.quoteAuthor;
		}

		// Reducing font size for long quote
		if(data.quoteText.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}

		quoteText.innerText = data.quoteText;

		// hide loader and show quote
		completed();
	} catch(error) {
		let countRequest = 7;

		// if server doesn't respond, make some requests again
		while(countRequest != 0) {
			getQuoteFromAPI();
			countRequest -= 1
		}

		alert('whoops, no quote', error);
	}
}

// Tweet Quote
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

	window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
//getQuote();