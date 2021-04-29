const form = document.getElementById('form'),
	pswd1El = document.getElementById('password1'),
	pswd2El = document.getElementById('password2'),
	msgContainer = document.querySelector('.message-container'),
	msg = document.getElementById('message')

let isValid = false,
	isPswdMatch = false

function validateForm() {
	isValid = form.checkValidity()
	console.log(isValid)
	if(!isValid) {
		msg.textContent = 'Please fill out all fields!'
		msg.style.color = 'red'
		msgContainer.style.borderColor = 'red'
		return;
	}

	if(pswd1El.value === pswd2El.value) {
		isPswdMatch = true
		pswd1El.style.borderColor = 'lime'
		pswd2El.style.borderColor = 'lime'
	} else {
		isPswdMatch = false
		msg.textContent = 'Make sure passwords are match!'
		msg.style.color = 'red'
		msgContainer.style.borderColor = 'red'
		pswd1El.style.borderColor = 'red'
		pswd2El.style.borderColor = 'red'
		return;
	}

	if(isValid && isPswdMatch) {
		msg.textContent = 'Successfully registered!'
		msg.style.color = 'lime'
		msgContainer.style.borderColor = 'lime'
	}
}

function storeData() {
	const user = {
		name: form.name.value,
		phone: form.phone.value,
		email: form.email.value,
		website: form.website.value,
		pswd: form.password.value
	}

	console.log(user)
}

function processFormData(event) {
	event.preventDefault()

	validateForm()
	if(isValid && isPswdMatch)
		storeData()
}

// event listeners
form.addEventListener('submit', processFormData)
