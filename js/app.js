//Set start game button to start variable
const start = document.querySelector('.start');
//Set onscreen keyboard keys container to onScreenKeys.
const onScreenKeys = document.querySelector('#qwerty');
//Set guessing pharase to liLettersParent.
const liLettersParent = document.querySelector('#phrase');
//Set lives lost to missed. Set it to 0.
let missed = 0;
//Function getRandomPhrasesArray
//pass in iterable elements(array);
const getRandomPhrasesArray = ([]) => {
	//Get random number from 0 to the length of array    
	let randomNumber = Math.floor(Math.random() * phrases.length);
	//Set the element of the array at the index of the random number to randomPhrase variable.
	let randomPHrase = phrases[randomNumber];
	//Make the randomPhrase iterable(array) with the spread operator and return it.
	return [...randomPHrase];
	//End function
}
//Function addPhraseToDisplay expects array for argument.
const addPhraseToDisplay = (arr) => {
	//For each character in array   
	arr.forEach(item => {
		//Create an li element
		let li = document.createElement('li');
		//Put item in the created li element
		li.innerHTML = item;
		//Append li element to the ul(phrase) element.
		liLettersParent.appendChild(li);
		//If letter is not a space
		if (item !== ' ') {
			li.classList.add('letter');
		} else {
			li.classList.add('space');
		}
	});
	//End function
}
//Function checkLetter.
const checkLetter = (clicked) => {
	//Set all li elements with className letter to letter variable.
	let letters = liLettersParent.querySelectorAll('.letter');
	let letterFound;
	//return an anonymous function to keep the scope variables functional.
	//Loop through all li elements
	letters.forEach(value => {
		//Return one that match the condition           
		if (value.textContent.toLocaleLowerCase() === clicked) {
			value.classList.add('show');
			letterFound = clicked;
			return letterFound;
			//Return null, if otherwise.               
		} else {
			return null;
		}
	});
	return letterFound;
	//End function
}
//Function missedGuesses. 
const missedGuesses = (letterValue) => {
	//Get all heart img elements & set them to lives.
	let lives = document.querySelectorAll('.tries img');
	//Set lives to lostHeart if guess is wrong.   
	if (!letterValue) {
		lives[missed].src = 'images/lostHeart.png';
		missed += 1;
	}
	//End function
}
//Function Reset
const resetGame = () => {
	//Set lives img to live.
	let lives = document.querySelectorAll('.tries img');
	//Set all phrase letter(li) to liElements.
	const liElements = liLettersParent.querySelectorAll('li');
	//Set all all buttons to buttons
	const buttons = onScreenKeys.querySelectorAll('button');
	//Reset the phrase letters 
	liLettersParent.innerHTML = '';
	//Reset score
	missed = 0;
	//Reset the chosen class given to clicked buttons & enabled them.
	buttons.forEach(button => {
		button.classList.remove('chosen');
		button.removeAttribute('disabled');
	})
	//Reset the displayed phrase list.
	liElements.forEach(li => {
		li.classList.remove('show');
	});
	//Reset live hearts.
	lives.forEach(live => {
		live.setAttribute('src', 'images/liveHeart.png');
	});
	//End function
}
//Func CheckWin
const CheckWin = () => {
	//Set overlay div to overlay.
	const overLay = document.querySelector('#overlay');
	//Set Start button(a anchor) to reset.
	const reset = document.querySelector('a');
	//Set li elements with letter class to letters.
	const letters = liLettersParent.querySelectorAll('.letter');
	//Set li elements with show class to letters.
	const show = liLettersParent.querySelectorAll('.show');
	//If missed variable is more than 4, show the lose overlay.
	if (missed > 4) {
		reset.textContent = 'Try Again';
		overLay.className = 'lose';
		overLay.style.display = 'flex';
		resetGame();
	} else {
		//If the length of the letter & show class are equal, show the win overlay.
		if (letters.length === show.length) {
			reset.textContent = 'Play Again';
			overLay.className = 'win';
			overLay.style.display = 'flex';
			resetGame();
		}
	}
	//End function       
}
//Add a click event to screen keyboard.
onScreenKeys.addEventListener('click', (e) => {
	//Event delgation with if statement
	if (e.target.tagName === 'BUTTON') {
		//Set textContent of clicked button to clicked 
		let clicked = e.target.textContent.toLocaleLowerCase();
		//Add chosen class to it
		e.target.classList.add('chosen');
		//Disabled it
		e.target.setAttribute('disabled', true);
		//Use clicked variable as argument to checkLetter function.
		const checkLetterValue = checkLetter(clicked);
		//Call missedGuesses on click. 
		missedGuesses(checkLetterValue);
		//Call checkWin func on each click to determine win or lose.
		CheckWin();
	}
	//End event
});
//Add a click event to physical keyboard.
document.addEventListener('keydown', (e) => {
	//Disable keyboard activity when the ovelay screen is visible.
	if (document.getElementById('overlay').style.display === 'none') {
		//Get all buttons from on screen keyboard.
		let physicalKeys = onScreenKeys.querySelectorAll('button');
		//Iterate through all the buttons,
		physicalKeys.forEach(key => {
			//If the pushed button match a phrase letter,
			if (key.innerHTML === e.key) {
				//Give it a chosen class,
				key.classList.add('chosen');
				//Disabled it,
				key.setAttribute('disabled', true);
				//& call the checkLetter func to display the letter in the phrase. Set the value of checkLetter to CheckLetterValue
				const checkLetterValue = checkLetter(key.textContent);
				//Call the missedGuesses func and pass it the CheckLetterValue as argument;
				missedGuesses(checkLetterValue);
			}
		})
		//Call checkWin func on each click to determine win or lose.
		CheckWin();
	}
	//End event
});
//Add a click event to start
start.addEventListener('click', (e) => {
	//Hide the "wheel of success" screen when start button is clicked
	if (e.target.tagName === 'A') {
		const overLay = document.querySelector('#overlay');
		overLay.style.display = 'none';
		//Set return value of getRandomPhrasesArray to phraseToDisplay variable.
		const phraseArray = getRandomPhrasesArray(phrases);
		//Call addPhraseToDisplay with phraseToDisplay.
		addPhraseToDisplay(phraseArray);
	}
	//End event 
});