// Wait for the DOM to finish loading before running game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function () {
	let buttons = document.getElementsByTagName('button');

	// More modern syntax for looping through the array
	for (let button of buttons) {
		button.addEventListener('click', function () {
			if (this.getAttribute('data-type') === 'submit') {
				// Dummy code to make sure the buttons are working
				checkAnswer();
			} else {
				let gameType = this.getAttribute('data-type');
				// Non null check required for jsdoc to work
				if (gameType !== null) {
					runGame(gameType);
				}
			}
		});
	}
	// Allow users to use the enter key
	document.getElementById('answer-box').addEventListener('keydown', function (e) {
		if (e.key === 'Enter') {
			checkAnswer();
		}
	});
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
	// Remove previous answer
	document.getElementById('answer-box')['value'] = '';
	// Enable focus as soon as function is called
	document.getElementById('answer-box').focus();

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
		displayAdditionQuestion(num1, num2);
	} else if (gameType === 'subtract') {
		displaySubtractQuestion(num1, num2);
	} else if (gameType === 'multiply') {
		displayMultiplyQuestion(num1, num2);
	} else if (gameType === 'division') {
		displayDivisionQuestion();
	} else {
		alert(`Unknown game type: ${gameType}`);
		throw `Unknown game type: ${gameType}. Aborting`;
	}
}

// Check answer function
/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
	if (!document.getElementById('answer-box')) {
		throw 'No answer box element found. Aborting!';
	}
	// Using square bracket notation to avoid the error arising
	// from HTMLInputElement being a sub-type of HTMLElement
	const userAnswer = parseInt(document.getElementById('answer-box')['value']);
	let calculatedAnswer = calculateCorrectAnswer();
	let isCorrect = userAnswer === calculatedAnswer[0];
	if (isCorrect) {
		alert('Hey! You got it right! :D');
		incrementScore();
	} else {
		alert(
			`Awww... you answered ${userAnswer} which isnt quite correct. The correct answer was be ${calculatedAnswer[0]}!`
		);
		incrementWrongAnswer();
	}
	runGame(calculatedAnswer[1]);
	console.log(userAnswer);
}

// Helper function - calculateCorrectAnswer
/**
 * Gets the oeprands (numbers) and the operator
 * directly from the DOM and returns the correct answer
 * @returns {[number,string]}
 */
function calculateCorrectAnswer() {
	let operand1 = document.getElementById('operand1')?.innerText;
	let operand2 = document.getElementById('operand2')?.innerText;
	let operator = document.getElementById('operator')?.innerText;
	if (!operand1 && !operand2) {
		throw 'Cannot find operand(s). Aborting';
	}
	if (typeof operand1 !== 'string' || typeof operand2 !== 'string') {
		throw 'Type of operand(s) must be string';
	}
	let intOp1 = parseInt(operand1);
	let intOp2 = parseInt(operand2);
	if (operator === '+') {
		return [intOp1 + intOp2, 'addition'];
	} else if (operator === 'x') {
		return [intOp1 * intOp2, 'multiply'];
	} else if (operator === '\u00F7') {
	} else if (operator === '-') {
		return [intOp1 - intOp2, 'subtract'];
	} else {
		alert(`Unimplemented operator ${operator}`);
		throw `Unimplemented operator ${operator}. Aborting!`;
	}
}

// Increment score/wrong answer
/**
 * Gets current score from DOM and increment by 1
 */
function incrementScore() {
	let oldScore = parseInt(document.getElementById('score').innerText);
	// Important to use (++oldScore) and not (oldScore++) because JS will first
	// write the oldScore to the DOM then increment the variable,
	// so we will never actuall see the incremented score in the front end.
	// Using toString() as innerText needs to be a string type.
	document.getElementById('score').innerText = (++oldScore).toString();
}
/**
 * Gets the current tally of incorrect answers from the DOM and increases it by 1
 */
function incrementWrongAnswer() {
	let oldScore = parseInt(document.getElementById('incorrect').innerText);
	document.getElementById('incorrect').innerText = (++oldScore).toString();
}

// Display questions
// Using unicode to display correct symbols
function displayAdditionQuestion(operand1, operand2) {
	document.getElementById('operand1').textContent = operand1.toString();
	document.getElementById('operand2').textContent = operand2.toString();
	document.getElementById('operator').textContent = '\u002B';
}

function displaySubtractQuestion(operand1, operand2) {
	document.getElementById('operator').textContent = '-';
	// put larger of two numbers as operand 1
	document.getElementById('operand1').textContent =
		operand1 > operand2 ? operand1 : operand2;
	document.getElementById('operand2').textContent =
		operand1 > operand2 ? operand2 : operand1;
}
function displayMultiplyQuestion(operand1, operand2) {
	document.getElementById('operand1').textContent = operand1.toString();
	document.getElementById('operand2').textContent = operand2.toString();
	document.getElementById('operator').textContent = 'x';
}
function displayDivisionQuestion(operand1, operand2) {
	// document.getElementById('operator').textContent = '\u00F7';
}
