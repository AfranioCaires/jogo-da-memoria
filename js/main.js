const moves = document.getElementById('moves-counter');
const timeValue = document.getElementById('timer');
const startBtn = document.getElementById('start-game');
const stopBtn = document.getElementById('stop-game');
const gameContainer = document.querySelector('.game-container');
const result = document.getElementById('result');
const controls = document.querySelector('.controls-container');

let cards;
let interval;
let fisrtCard = false;
let secondCard = false;

const items = [
    {name: "bee", img: "img/bee.png"},
    {name:"crocodile", img: "img/crocodile.png"},
    {name:"macaw", img: "img/macaw.png"},
    {name:"gorilla", img: "img/gorilla.png"},
    {name:"tiger", img: "img/tiger.png"},
    {name:"monkey", img: "img/monkey.png"},
    {name:"chameleon", img: "img/chameleon.png"},
    {name:"piranha", img: "img/piranha.png"},
    {name:"anaconda", img: "img/anaconda.png"},
    {name:"sloth", img: "img/sloth.png"},
    {name:"cockatoo", img: "img/cockatoo.png"},
    {name:"toucan", img: "img/toucan.png"},
]

let seconds = 0,
    minutes = 0;

let movesCount = 0,
    winCounter = 0;

const timeGenerator = () => {
    seconds++;

    if(seconds / 60 === 1) {
        seconds = 0;
        minutes++;
    }
}

let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
let minutesValues = minutes < 10 ? `0${minutes}` : minutes;

timeValue.innerHTML = `<span>Time:</span?> ${minutesValues}:${secondsValue}`;

const movesCounter = () => {
    // movesCount++;
    moves.innerHTML = `<span>Moves:</span> ${++movesCount}`
}
