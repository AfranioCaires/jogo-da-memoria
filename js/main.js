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

class Card {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}