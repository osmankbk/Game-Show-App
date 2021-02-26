//Set start game button to start variable
const start = document.querySelector('.start');
//Set onscreen keyboard keys container to onScreenKeys.
const onScreenKeys = document.querySelectorAll('#qwerty');
//Set guessing pharase to phraseToGuess.
const phraseToGuess = document.querySelector('#phrase');
//Set lives lost to missed.
let missed = 0;

//Add a click event to start
start.addEventListener('click', () => {
//Hide the "while of success" screen when start button is clicked
    const overLay = document.querySelector('#overlay');
    overLay.style.display = 'none';
})
console.log(onScreenKeys);   