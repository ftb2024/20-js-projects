const videoElem = document.getElementById('video'),
	btn = document.getElementById('btn');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElem.srcObject = mediaStream;
		videoElem.onloadedmetadata = () => {
			videoElem.play();
		}
	} catch(error) {
		console.log(`whoops, error here: ${error}`);
	}
}

btn.addEventListener('click', async() => {
	// Disable button
	btn.disabled = true;
	// Start Picture in Picture
	await videoElem.requestPictureInPicture();
	// Reset button
	btn.disabled = false;
});

// On Load
selectMediaStream();
