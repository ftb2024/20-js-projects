const player = document.querySelector('.player'),
	video = document.querySelector('video'),
	progressRange = document.querySelector('.progress-range'),
	progressBar = document.querySelector('.progress-bar'),
	playBtn = document.getElementById('play-btn'),
	volumeIcon = document.getElementById('volume-icon'),
	volumeRange = document.querySelector('.volume-range'),
	volumeBar = document.querySelector('.volume-bar'),
	currentTime = document.querySelector('.time-elapsed'),
	duration = document.querySelector('.time-duration'),
	speed = document.querySelector('.player-speed')
	fullscreenBtn = document.querySelector('.fullscreen');

// --- play & pause ---
function showPlayIcon() {
	playBtn.classList.replace('fa-pause', 'fa-play')
}

function togglePlay() {
	if(video.paused) {
		video.play()
		playBtn.classList.replace('fa-play', 'fa-pause')
	} else {
		video.pause()
		showPlayIcon()
	}
}

// on video end, show play button icon
video.addEventListener('ended', showPlayIcon)

// --- progress bar ---
function displayTime(time) {
	let minutes = Math.floor(time / 60),
		seconds = Math.floor(time % 60)

	seconds = seconds > 9 ? seconds : `0${seconds}`

	return `${minutes}:${seconds}`
}

//
function setProgress(event) {
	const newTime = event.offsetX / event.srcElement.offsetWidth
	progressBar.style.width = `${newTime * 100}%`
	video.currentTime = newTime * video.duration
}

// update progress bar as video plays
function updateProgress() {
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`

	currentTime.textContent = `${displayTime(video.currentTime)} / `
	duration.textContent = `${displayTime(video.duration)}`
}

// --- volume bar ---
let lastVolume = 1

function changeVolume(event) {
	let volume = event.offsetX / event.srcElement.offsetWidth

	if(volume < 0.1) {
		volume = 0
	} else if(volume > 0.9) {
		volume = 1
	}

	volumeBar.style.width = `${volume * 100}%`
	video.volume = volume

	// change icon depending on volume
	volumeIcon.className = ''
	if(volume > 0.7) {
		volumeIcon.classList.add('fas', 'fa-volume-up')
	} else if(volume < 0.7 && volume > 0) {
		volumeIcon.classList.add('fas', 'fa-volume-down')
	} else if(volume === 0) {
		volumeIcon.classList.add('fas', 'fa-volume-off')
	}

	lastVolume = volume
}

// mute / unmute
function toggleMute() {
	volumeIcon.className = ''

	if(video.volume) { // if video volume more than 0
		lastVolume = video.volume
		video.volume = 0

		volumeIcon.classList.add('fas', 'fa-volume-mute')
		volumeBar.style.width = 0
	} else {
		video.volume = lastVolume
		volumeBar.style.width = `${lastVolume * 100}%`
		volumeIcon.classList.add('fas', 'fa-volume-up')
	}
}

// --- playback speed ---
function changeSpeed() {
	video.playbackRate = speed.value
}

// --- fullscreen ---
function openFullscreen(elem) {
	if(elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if(elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} else if(elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}

	video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen();
	} else if(document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen();
	}

	video.classList.remove('video-fullscreen')
}

// toggle fullscreen
let fullscreen = false
function toggleFullScreen() {
	if(!fullscreen) {
		openFullscreen(player)
	} else {
		closeFullscreen()
	}

	fullscreen = !fullscreen
}

// event listeners
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)
speed.addEventListener('change', changeSpeed)
fullscreenBtn.addEventListener('click', toggleFullScreen)
