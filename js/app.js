//Set start game button to start variable
const start = document.querySelector('.start');
//Set onscreen keyboard keys container to onScreenKeys.
const onScreenKeys = document.querySelectorAll('#qwerty');
//Set guessing pharase to phraseToGuess.
const phraseToGuess = document.querySelector('#phrase');
//Set lives lost to missed.
let missed = 0;

//function getRandomPhrasesArray
//pass in iterable elements(array);
const getRandomPhrasesArray = ([arr]) => {
//Get random number from 0 to the length of array    
    let randomNumber = Math.floor(Math.random() * phrases.length);
//Set the element of the array at the index of the random number to randomPhrase variable.
    let randomPHrase = phrases[randomNumber];
//Make the randomPhrase iterable(array) with the spread operator and return it.
    return [...randomPHrase];
}

//Add a click event to start
start.addEventListener('click', () => {
//Hide the "while of success" screen when start button is clicked
    const overLay = document.querySelector('#overlay');
    overLay.style.display = 'none';
})
console.log(getRandomPhrasesArray(phrases));   