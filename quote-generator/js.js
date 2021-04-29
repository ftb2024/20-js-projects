// получаем доступ к элементам на странице
const quoteContainer = document.getElementById('quote-container'),
	quoteTxt = document.getElementById('quote'),
	authorTxt = document.getElementById('author'),
	twitterBtn = document.getElementById('twitter'),
	newQuoteBtn = document.getElementById('new-quote'),
	loader = document.getElementById('loader');

async function getQuoteFromAPI() {
	showLoader();

	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const baseUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

	try {
		const request = await fetch(proxyUrl + baseUrl);
		const data = await request.json();

		quoteTxt.innerText = data.quoteText;
		authorTxt.innerText = data.quoteAuthor;

		removeLoader();
	} catch {
		// если запрос не пошел на сервер, то пробуем еще несколько раз сделать запрос
		let countRequest = 7;
		
		while(countRequest != 0) {
			getQuoteFromAPI();
			countRequest -= 1
		}

		alert('whoops, no quote', error);
	}
}

function showLoader() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoader() {
	if(loader.hidden === false) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

function tweetQuote() {
	const quote = quoteTxt.innerText;
	const author = authorTxt.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

	window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// страница загрузилась, вызываем функцию
getQuoteFromAPI();