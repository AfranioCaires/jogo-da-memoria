import { MemoryGameLogic } from "./gameLogic.js";

export class MemoryGameUI extends MemoryGameLogic {
  constructor() {
    super();
    this.moves = document.getElementById("moves-count"); // Elemento HTML para exibir o número de movimentos
    this.timeValue = document.getElementById("time"); // Elemento HTML para exibir o tempo de jogo
    this.startButton = document.getElementById("start"); // Botão de iniciar o jogo
    this.stopButton = document.getElementById("stop"); // Botão de parar o jogo
    this.gameContainer = document.querySelector(".game-container"); // Container do jogo
    this.result = document.getElementById("result"); // Elemento HTML para exibir o resultado do jogo
    this.controls = document.querySelector(".controls-container"); // Container dos controles do jogo
    this.cards = []; // Array para armazenar as cartas do jogo
    this.interval = null; // Variável para armazenar o intervalo de tempo do jogo
    this.firstCard = false; // Variável para armazenar a primeira carta selecionada
    this.secondCard = false; // Variável para armazenar a segunda carta selecionada
    this.firstCardValue = ""; // Valor da primeira carta selecionada
    this.tempFirst = null; // Variável temporária para armazenar a primeira carta selecionada
    this.seconds = 0; // Contador de segundos
    this.minutes = 0; // Contador de minutos
  }

  // Funcção para determinar a dificuldade do jogo;
  setDifficulty() {
    const difficulty = document.getElementById("difficulty").value;
    switch (difficulty) {
      case "easy":
        this.cardVisibleTime = 2000; // 2s
        break;
      case "medium":
        this.cardVisibleTime = 1000; // 1s
        break;
      case "hard":
        this.cardVisibleTime = 500; // 0.5s
        break;
      default:
        this.cardVisibleTime = 1000; // 1s (padrão)
    }
  }

  // Função para gerar o tempo do jogo
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

  // Função para contar os movimentos do jogador
  movesCounter() {
    this.updateMovesCount();
    this.moves.innerHTML = `<span>Movimentos:</span>${this.movesCount}`;
  }

  // Função para gerar a matriz de cartas do jogo
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
                  <div class="victory">
                    <h2>Você Venceu</h2>
                    <h4>Movimentos: ${this.movesCount}</h4>
                    <h4>${this.timeValue.innerText}</h4>
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
              }, this.cardVisibleTime);
            }
          }
        }
      });
    });
  }

  // Função para iniciar o jogo
  startGame() {
    this.movesCount = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.setDifficulty();
    this.controls.classList.add("hide");
    this.stopButton.classList.remove("hide");
    this.startButton.classList.add("hide");
    this.interval = setInterval(() => this.timeGenerator(), 1000);
    this.moves.innerHTML = `<span>Movimentos:</span> ${this.movesCount}`;
    this.initialize();
  }

  // Função para parar o jogo
  stopGame() {
    this.controls.classList.remove("hide");
    this.stopButton.classList.add("hide");
    this.startButton.classList.remove("hide");
    clearInterval(this.interval);
  }

  // Função para inicializar a lógica de construção do jogo
  initialize() {
    this.result.innerText = "";
    this.winCount = 0;
    let cardValues = this.generateRandom();
    this.matrixGenerator(cardValues);
  }
}
