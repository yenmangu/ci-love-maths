// Wait for the DOM to finish loading before running game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function () {
	let buttons = document.getElementsByTagName('button');
	// More modern syntax for looping through the array
	for (let button of buttons) {
		button.addEventListener('click', function () {
			if (this.getAttribute('data-type') === 'submit') {
				// Dummy code to make sure the buttons are working
				alert('You clicked Submit!');
			} else {
				let gameType = this.getAttribute('data-type');
				alert(`You clicked ${gameType}`);
			}
		});
	}
});

// Main game function
function runGame() {}

// Check answer function
function checkAnswer() {}

// Helper function - calculateCorrectAnswer
function calculateCorrectAnswer() {}

// Increment score/wrong answer
function incrementScore() {}

function incrementWrongAnswer() {}

// Display questions

function displayAdditionQuestion() {}
function displaySubtractQuestion() {}
function displayMultiplyQuestion() {}
function displayDivideQuestion() {}
