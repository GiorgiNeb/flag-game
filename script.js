`use strict`;
const flags = [
  "images//georgia.png",
  "images//azerbaijan.png",
  "images//austria.png",
  "images//armenia.png",
  "images//norway.png",
  "images//turkey.png",
  "images//italy.png",
  "images//serbia.png",
];

const answers = [
  `georgia`,
  `azerbaijan`,
  `austria`,
  `armenia`,
  `norway`,
  `turkey`,
  `italy`,
  `serbia`,
];

// here are my variables:
const check = document.querySelector(`.check`);
const flag = document.querySelector(`#flag`);
const userGuess = document.querySelector(`.userGuess`);
const answerValue = document.querySelector(`#answervalue`);
const next = document.querySelector(`.next`);
const scorediv = document.querySelector(`.score`);
const win = document.querySelector(`.win`);
const winMassage = document.querySelector(`#winMassage`);
const scoreMassage = document.querySelector(`#scoreMassage`);
const reset = document.querySelector(`.reset`);
let x = 0;
let score = 3;
let audioCount = 0;
let audio = document.getElementById(`audio`);
let musicButton = document.getElementById(`musicButton`);
let musicButtonState = document.getElementById(`buttonState`);

flag.style.backgroundColor = `rgb(35, 143, 147)`;
/* this function will `listen` click on check button and will compare user input to actual answer and display `correct` or `incorrect`. Also it will display `win massage` if game is won, or `lose massage` if game is lose. Function is also responsible for score count.*/
check.addEventListener(`click`, function () {
  if (userGuess.value.toLowerCase() === answers[x] && userGuess.value != "") {
    answerValue.textContent = `Correct!`;
    answerValue.style.color = `rgb(5, 55, 5)`;
    flag.style.backgroundColor = `green`;
    next.style.display = `block`;
    if (x === answers.length - 1) {
      win.style.position = `absolute`;
      win.style.display = `block`;
      win.style.backgroundColor = `green`;
      winMassage.textContent = `🏆YOU WIN!`;
      scoreMassage.textContent = `Score = ${score}`;
    }
  } else if (
    userGuess.value.toLowerCase() !== answers[x] &&
    userGuess.value != ""
  ) {
    score--;
    scorediv.textContent = `Score = ${score}`;
    if (score === 1) {
      scorediv.style.color = `red`;
    }
    if (score <= 0) {
      win.style.display = `block`;
      win.style.position = `absolute`;
      win.style.backgroundColor = `red`;
      winMassage.textContent = `🙄YOU LOSE!`;
      scoreMassage.textContent = `Score = ${score}`;
    }
    answerValue.textContent = `Incorrect!`;
    answerValue.style.color = `red`;
    flag.style.backgroundColor = `rgb(147, 35, 35)`;
    flag.textContent = answers[x];
    next.style.display = `block`;
    check.setAttribute("disabled", "");
    check.style.cursor = `not-allowed`;
  }
});

/* This function will respond on click on next button and display new question to user. */
next.addEventListener(`click`, function () {
  x++;
  answerValue.textContent = ``;
  next.style.display = `none`;
  userGuess.value = ``;
  flag.style.backgroundImage = `url(${flags[x]})`;
  flag.textContent = ``;
  check.removeAttribute("disabled");
  check.style.cursor = `pointer`;
});

// This function handles sound play and pause.
function playPause() {
  if (audioCount === 0) {
    audioCount = 1;
    audio.play();
    musicButtonState.className = `fa-sharp fa-solid fa-volume-high`;
  } else {
    audioCount = 0;
    audio.pause();
    musicButtonState.className = `fa-sharp fa-solid fa-volume-xmark`;
  }
}

reset.addEventListener(`click`, function () {
  x = 0;
  score = 3;
  scorediv.textContent = `Score = ${score}`;
  scorediv.style.color = `black`;
  win.style.display = `none`;
  answerValue.textContent = ``;
  flag.style.backgroundColor = `rgb(35, 143, 147)`;
  userGuess.value = ``;
  flag.textContent = ``;
  flag.style.backgroundImage = `url(${flags[x]})`;
  check.removeAttribute("disabled");
  check.style.cursor = `pointer`;
});

// This code below triggers `click` on check button when user hits enter in text element;
userGuess.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    check.click();
  }
});
