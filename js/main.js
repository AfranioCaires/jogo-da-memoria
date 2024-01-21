class Card {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }
}

class MemoryGameLogic {
  constructor() {
    this.movesCount = 0;
    this.winCount = 0;
    this.items = [
      new Card("bee", "../img/bee.png"),
      new Card("crocodile", "img/crocodile.png"),
      new Card("macaw", "img/macaw.png"),
      new Card("gorilla", "img/gorilla.png"),
      new Card("tiger", "img/tiger.png"),
      new Card("monkey", "img/monkey.png"),
      new Card("chameleon", "img/chameleon.png"),
      new Card("piranha", "img/piranha.png"),
      new Card("anaconda", "img/anaconda.png"),
      new Card("sloth", "img/sloth.png"),
      new Card("cockatoo", "img/cockatoo.png"),
      new Card("toucan", "img/toucan.png"),
    ];
  }

  generateRandom(size = 4) {
    let tempArray = [...this.items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
  }

  checkMatch(firstCardValue, secondCardValue) {
    return firstCardValue === secondCardValue;
  }

  updateMovesCount() {
    this.movesCount += 1;
  }

  updateWinCount() {
    this.winCount += 1;
  }

  isGameWon(cardValues) {
    return this.winCount === Math.floor(cardValues.length / 2);
  }
}

class MemoryGameUI extends MemoryGameLogic {
  constructor() {
    super();
    this.moves = document.getElementById("moves-count");
    this.timeValue = document.getElementById("time");
    this.startButton = document.getElementById("start");
    this.stopButton = document.getElementById("stop");
    this.gameContainer = document.querySelector(".game-container");
    this.result = document.getElementById("result");
    this.controls = document.querySelector(".controls-container");
    this.cards = [];
    this.interval = null;
    this.firstCard = false;
    this.secondCard = false;
    this.firstCardValue = "";
    this.tempFirst = null;
    this.seconds = 0;
    this.minutes = 0;
  }

  timeGenerator() {
    this.seconds += 1;
    if (this.seconds >= 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
    let secondsValue = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    let minutesValue = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    this.timeValue.innerHTML = `<span>Tempo:</span>${minutesValue}:${secondsValue}`;
  }

  movesCounter() {
    this.updateMovesCount();
    this.moves.innerHTML = `<span>Movimentos:</span>${this.movesCount}`;
  }

  matrixGenerator(cardValues, size = 4) {
    this.gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
      this.gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">?</div>
          <div class="card-after">
            <img src="${cardValues[i].img}" class="image"/>
          </div>
        </div>
      `;
    }
    this.gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    this.cards = document.querySelectorAll(".card-container");
    this.cards.forEach((card) => {
      card.addEventListener("click", () => {
        if (!card.classList.contains("matched")) {
          card.classList.add("flipped");
          if (!this.firstCard) {
            this.firstCard = card;
            this.firstCardValue = card.getAttribute("data-card-value");
          } else {
            this.movesCounter();
            this.secondCard = card;
            let secondCardValue = card.getAttribute("data-card-value");
            if (this.checkMatch(this.firstCardValue, secondCardValue)) {
              this.firstCard.classList.add("matched");
              this.secondCard.classList.add("matched");
              this.firstCard = false;
              this.updateWinCount();
              if (this.isGameWon(cardValues)) {
                this.result.innerHTML = `
                    <h2>Você Venceu</h2>
                    <h4>Movimentos: ${this.movesCount}</h4>
                    <h4>Tempo: ${this.timeValue.innerText}</h4>
                  </div>
                    `;
                this.stopGame();
              }
            } else {
              [this.tempFirst, this.tempSecond] = [
                this.firstCard,
                this.secondCard,
              ];
              this.firstCard = false;
              this.secondCard = false;
              let delay = setTimeout(() => {
                this.tempFirst.classList.remove("flipped");
                this.tempSecond.classList.remove("flipped");
              }, 900);
            }
          }
        }
      });
    });
  }

  startGame() {
    this.movesCount = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.controls.classList.add("hide");
    this.stopButton.classList.remove("hide");
    this.startButton.classList.add("hide");
    this.interval = setInterval(() => this.timeGenerator(), 1000);
    this.moves.innerHTML = `<span>Movimentos:</span> ${this.movesCount}`;
    this.initialize();
  }

  stopGame() {
    this.controls.classList.remove("hide");
    this.stopButton.classList.add("hide");
    this.startButton.classList.remove("hide");
    clearInterval(this.interval);
  }

  initialize() {
    this.result.innerText = "";
    this.winCount = 0;
    let cardValues = this.generateRandom();
    console.log(cardValues);
    this.matrixGenerator(cardValues);
  }
}

const memoryGame = new MemoryGameUI();

memoryGame.startButton.addEventListener("click", () => {
  memoryGame.startGame();
});

memoryGame.stopButton.addEventListener("click", () => {
  memoryGame.stopGame();
});
