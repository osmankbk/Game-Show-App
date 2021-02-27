//Set start game button to start variable
const start = document.querySelector('.start');
//Set onscreen keyboard keys container to onScreenKeys.
const onScreenKeys = document.querySelector('#qwerty');
//Set guessing pharase to phraseToGuess.
const phraseToGuess = document.querySelector('#phrase');
//Set lives lost to missed.
let missed = 0;

//Function getRandomPhrasesArray
//pass in iterable elements(array);
const getRandomPhrasesArray = ([arr]) => {
//Get random number from 0 to the length of array    
    let randomNumber = Math.floor(Math.random() * phrases.length);
//Set the element of the array at the index of the random number to randomPhrase variable.
    let randomPHrase = phrases[randomNumber];
//Make the randomPhrase iterable(array) with the spread operator and return it.
    return [...randomPHrase];
}

//Set return value of getRandomPhrasesArray to phraseToDisplay variable.
const phraseToDisplay = getRandomPhrasesArray(phrases);

//Function addPhraseToDisplay expects array for argument.
const addPhraseToDisplay = (arr) => {
//For each character in array   
    arr.forEach(item => {
//Create an li element
        let li = document.createElement('li');
//Put item in the created li element
        li.innerHTML = item;
//Append li element to the ul(phrase) element.
        phraseToGuess.appendChild(li);
//If letter is not a space
        if(item !== ' ') {
            li.classList.add('letter');
        }
    });   
}

//Call addPhraseToDisplay with phraseToDisplay.
addPhraseToDisplay(phraseToDisplay);

//Higher-order function checkLetter.
const checkLetter = (clicked) => {
//Set all li elements with className letter to letter variable.
    let letters = phraseToGuess.querySelectorAll('.letter');
    let letterFound;
//return an anonymous function to keep the scope variables functional.
    return () => {
//Loop through all li elements
        for(let value of letters) {
 //Return one that match the condition           
            if(value.textContent === clicked) {
                value.classList.add('show');
                letterFound = value;
                return letterFound;
 //Return null, if otherwise.               
            } else {
                return null;
            }
        }
    }
}

//Add a click event
onScreenKeys.addEventListener('click', (e) => {
//Event delgation with if statement
       if(e.target.tagName === 'BUTTON'){
//Set textContent of clicked button to clicked 
           let clicked = e.target.textContent;
//Add chose class to it
           e.target.classList.add('chosen');
//Disabled it
           e.target.disabled = 'true';
//Use clicked variable as argument to checkLetter function
           checkLetter(clicked);
       }
});


//Event for physical keyboard
document.addEventListener('keydown', (e) => {
    let physicalKeys = onScreenKeys.querySelectorAll('button');
        physicalKeys.forEach(key => {
            if(key.innerHTML === event.key) {
                key.classList.add('chosen');
                key.disabled = 'true';
                checkLetter(key);
            }
        })
});

//Add a click event to start
start.addEventListener('click', () => {
//Hide the "while of success" screen when start button is clicked
    const overLay = document.querySelector('#overlay');
    overLay.style.display = 'none';
})
console.log(phraseToGuess);   