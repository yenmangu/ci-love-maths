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
				// Non null check required for jsdoc to work
				if (gameType !== null) {
					runGame(gameType);
				}
			}
		});
	}

	runGame('addition');
});

// How do we want to display the questions?
// Generate two random operands betwen 1 and 25

function generateOperand() {
	return Math.floor(Math.random() * 25) + 1;
}

// Main game function
/**
 * The main game "loop", called when the script is first loaded,
 * and after the user's answer has been processed
 * @param {string} gameType
 */
function runGame(gameType) {
	const opEl1 = document.getElementById('operand1');
	const opEl2 = document.getElementById('operand2');
	if (!opEl1 || !opEl2) {
		throw "Cannot find 'operand1' or 'operand2'. Aborting";
	}
	console.log('game running');
	let num1 = generateOperand();
	let num2 = generateOperand();

	// I would use switch/case for this, but the walkthrough is suggesting if/else
	// switch (gameType) {
	// 	case gameType === 'addition':
	// 		displayAdditionQuestion(num1, num2);
	// 		break;
	// 	default:
	// 		alert(`Unknown game type: ${gameType}`)
	// }

	if (gameType === 'addition') {
		displayAdditionQuestion(opEl1, opEl2, num1, num2);
	} else if (gameType === 'subtraction') {
		displaySubtractQuestion(num1, num2);
	} else if (gameType === 'multiplication') {
	} else if (gameType === 'division') {
	} else {
		alert(`Unknown game type: ${gameType}`);
		throw `Unknown game type: ${gameType}. Aborting`;
	}
}

// Check answer function
function checkAnswer() {}

// Helper function - calculateCorrectAnswer
function calculateCorrectAnswer() {}

// Increment score/wrong answer
function incrementScore() {}

function incrementWrongAnswer() {}

// Display questions
function displayAdditionQuestion(opElement1, opElement2, operand1, operand2) {
	opElement1.textContent = operand1;
	opElement2.textContent = operand2;
	const operator = document.getElementById('operator');
	operator.textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
	document.getElementById('operator').textContent = '-';
}
function displayMultiplyQuestion(operand1, operand2) {}
function displayDivideQuestion(operand1, operand2) {}
