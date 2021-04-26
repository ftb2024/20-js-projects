const music = document.querySelector('audio'),
	prevBtn = document.getElementById('prev'),
	nextBtn = document.getElementById('next'),
	playBtn = document.getElementById('play'),
	image = document.querySelector('img'),
	title = document.getElementById('title'),
	artist = document.getElementById('artist'),
	progressContainer = document.getElementById('progress-container'),
	progress = document.getElementById('progress'),
	currentTimeElem = document.getElementById('current-time'),
	durationElem = document.getElementById('duration');

// Music
const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Electric Chill Machine',
		artist: 'Jacinto Design'
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army (Remix)',
		artist: 'Jacinto Design'
	},
	{
		name: 'jacinto-3',
		displayName: 'Good Night Disco Queen',
		artist: 'Jacinto Design'
	},
	{
		name: 'metric-1',
		displayName: 'Front Row (Remix)',
		artist: 'Metric/Jacinto Design'
	}
]

// Check if Playing
let isPlaying = false;
// Current Song
let songIndex = 0;

// Play
const playSong = () => {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

// Pause
const pauseSong = () => {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

// Update DOM
const loadSong = (song) => {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

// Previous Song
const prevSong = () => {
	songIndex--;
	if(songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// Next Song
const nextSong = () => {
	songIndex++;
	if(songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// Update Progress Bar & Time
const updateProgressBar = (event) => {
	if(isPlaying) {
		const {duration, currentTime} = event.srcElement;

		// Update Progress Bar width
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;

		// Calculate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if(durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}

		// Delay switching duration Element to avoid NaN
		if(durationSeconds) {
			durationElem.textContent = `${durationMinutes}:${durationSeconds}`;
		}

		// Calculate display for current
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if(currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}

		currentTimeElem.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// Set Progress Bar
const setProgressBar = (event) => {
	const {clientWidth} = event.srcElement;
	let {offsetX} = event;
	// length of song in seconds
	const {duration} = music;
	// у тега audio есть аттрибут currentTime
	music.currentTime = (offsetX / clientWidth) * duration;
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => {
	isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgressBar);
// On Load - Select first song
loadSong(songs[songIndex]);
