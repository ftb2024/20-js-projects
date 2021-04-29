const inputContainer = document.getElementById('input-container'),
	countdownForm = document.getElementById('countdownForm'),
	dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown'),
	countdownElTitle = document.getElementById('countdown-title'),
	countdownBtn = document.getElementById('countdown-button'),
	timeElems = document.querySelectorAll('span');

const completeEl = document.getElementById('complete'),
	completeInfo = document.getElementById('complete-info'),
	completeBtn = document.getElementById('complete-button');

let countdownTitle = '', // название таймера
	countdownDate = '', // выбранная дата
	countdownValue = Date,
	countdownActive,
	savedCountdown;

const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

// set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populate countdown
const updateDOM = () => {
	countdownActive = setInterval(() => {
		const now = new Date().getTime(); // ск-ко миллисекунд прошло с 1970-01-01
		const distance = countdownValue - now;
		//console.log(`distance = ${distance}`);

		const days = Math.floor(distance / day);
		const hours = Math.floor((distance % day) / hour);
		const minutes = Math.floor((distance % hour) / minute);
		const seconds = Math.floor((distance % minute) / second);
		//console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);

		// hide inputContainer
		inputContainer.hidden = true;

		// if the countdown has ended, show complete
		if(distance < 0) {
			countdownEl.hidden = true;
			clearInterval(countdownActive);
			completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
			completeEl.hidden = false;
		} else {
			// else show the countdown in progress
			// populate countdown
			countdownElTitle.textContent = `${countdownTitle}`;
			timeElems[0].textContent = `${days}`;
			timeElems[1].textContent = `${hours}`;
			timeElems[2].textContent = `${minutes}`;
			timeElems[3].textContent = `${seconds}`;

			completeEl.hidden = true;
			countdownEl.hidden = false;
		}
	}, second);
}

// take values from form input
const updateCountdown = (event) => {
	event.preventDefault();
	countdownTitle = event.srcElement[0].value;
	countdownDate = event.srcElement[1].value;
	console.log(countdownDate);

	savedCountdown = {
		title: countdownTitle,
		date: countdownDate
	}
	console.log(savedCountdown);
	localStorage.setItem('countdown', JSON.stringify(savedCountdown)); // JSON.stringify() превращает JavaScript объект в JSON формат

	// check for valid date
	if(countdownDate === '') {
		alert('Please select a date for the countdown...');
	} else {
		// get number version of current date, updateDOM
		countdownValue = new Date(countdownDate).getTime();
		console.log(`countdownValue = ${countdownValue}`);

		updateDOM();
	}
}

// reset alla values
const reset = () => {
	// hide countdown, show inputContainer
	countdownEl.hidden = true;
	completeEl.hidden = true;
	inputContainer.hidden = false;
	
	// stop countdown
	clearInterval(countdownActive);

	// reset values
	countdownTitle = '';
	countdownDate = '';

	// clear localStorage to set new countdown
	localStorage.removeItem('countdown');
}

const restorePrevCountdown = () => {
	// get countdown from localStorage if available
	if(localStorage.getItem('countdown')) {
		inputContainer.hidden = true;
		savedCountdown = JSON.parse(localStorage.getItem('countdown'));
		countdownTitle = savedCountdown.title;
		countdownDate = savedCountdown.date;
		countdownValue = new Date(countdownDate).getTime();
		updateDOM();
	}
}

// event listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on load, check localStorage
restorePrevCountdown();
