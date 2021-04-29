const playerScoreEl = document.getElementById('playerScore'),
	playerChoiceEl = document.getElementById('playerChoice'),
	compScoreEl = document.getElementById('computerScore'),
	compChoiceEl = document.getElementById('computerChoice'),
	resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock'),
	playerPaper = document.getElementById('playerPaper'),
	playerScissors = document.getElementById('playerScissors'),
	playerLizard = document.getElementById('playerLizard'),
	playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock'),
	computerPaper = document.getElementById('computerPaper'),
	computerScissors = document.getElementById('computerScissors'),
	computerLizard = document.getElementById('computerLizard'),
	computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far')

const choices = {
	rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
	paper: { name: 'Paper', defeats: ['rock', 'spock'] },
	scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
	lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
	spock: { name: 'Spock', defeats: ['scissors', 'rock'] }
}

let compChoice = '' // выбор компьютера
let playerScore = 0
let compScore = 0

function compRandomChoice() {
	let compNumberChoice = Math.random()

	if(compNumberChoice < 0.2) {
		compChoice = 'rock'
	} else if(compNumberChoice <= 0.4) {
		compChoice = 'paper'
	} else if(compNumberChoice <= 0.6) {
		compChoice = 'scissors'
	} else if(compNumberChoice <= 0.8) {
		compChoice = 'lizard'
	} else {
		compChoice = 'spock'
	}
}

function displayCompChoice() {
	switch(compChoice) {
		case 'rock':
			computerRock.classList.add('selected')
			compChoiceEl.textContent = ' --- Rock'
			break

		case 'paper':
			computerPaper.classList.add('selected')
			compChoiceEl.textContent = ' --- Paper'
			break

		case 'scissors':
			computerScissors.classList.add('selected')
			compChoiceEl.textContent = ' --- Scissors'
			break

		case 'lizard':
			computerLizard.classList.add('selected')
			compChoiceEl.textContent = ' --- Lizard'
			break

		case 'spock':
			computerSpock.classList.add('selected')
			compChoiceEl.textContent = ' --- Spock'
			break

		default:
			break
	}
}

function updateResult(playerChoice) {
	if(compChoice === playerChoice) {
		resultText.textContent = "It's a tie."
	} else {
		let choice = choices[playerChoice]
		// возвращается -1 если переменная compChoice нет в массиве choice.defeats
		if(choice.defeats.indexOf(compChoice) > -1) {
			resultText.textContent = 'You won!'
			playerScore++
			playerScoreEl.textContent = playerScore
		} else {
			resultText.textContent = 'You lost!'
			compScore++
			compScoreEl.textContent = compScore
		}
	}
}

function resetAll() {
	window.location.reload()
}

function checkResult(playerChoice) {
	removeSelectedClass()
	compRandomChoice()
	displayCompChoice()
	updateResult(playerChoice)
}

function removeSelectedClass() {
	allGameIcons.forEach(icon => icon.classList.remove('selected'))
}

// выбираем элемент, добавляем класс selected, меням текстовое содержание
function select(playerChoice) {
	checkResult(playerChoice)

	switch(playerChoice) {
		case 'rock':
			playerRock.classList.add('selected')
			playerChoiceEl.textContent = ' --- Rock'
			break

		case 'paper':
			playerPaper.classList.add('selected')
			playerChoiceEl.textContent = ' --- Paper'
			break

		case 'scissors':
			playerScissors.classList.add('selected')
			playerChoiceEl.textContent = ' --- Scissors'
			break

		case 'lizard':
			playerLizard.classList.add('selected')
			playerChoiceEl.textContent = ' --- Lizard'
			break

		case 'spock':
			playerSpock.classList.add('selected')
			playerChoiceEl.textContent = ' --- Spock'
			break

		default:
			break
	}
}
