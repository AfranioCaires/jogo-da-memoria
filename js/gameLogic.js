import { Card } from "./cards.js";

export class MemoryGameLogic {
  constructor() {
    // Inicializa as contagens de movimentos e vitórias como zero
    this.movesCount = 0;
    this.winCount = 0;

    // Cria um array de objetos Card com diferentes nomes e imagens
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

  // Gera um array aleatório de valores de cartas com base no tamanho especificado
  generateRandom(size = 4) {
    let tempArray = [...this.items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
      // Seleciona um índice aleatório do array temporário
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      // Adiciona o valor da carta correspondente ao índice aleatório ao array de valores de cartas
      cardValues.push(tempArray[randomIndex]);
      // Remove o valor da carta do array temporário para evitar repetições
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
  }

  // Verifica se dois valores de cartas são iguais
  checkMatch(firstCardValue, secondCardValue) {
    return firstCardValue === secondCardValue;
  }

  // Atualiza a contagem de movimentos
  updateMovesCount() {
    this.movesCount += 1;
  }

  // Atualiza a contagem de vitórias
  updateWinCount() {
    this.winCount += 1;
  }

  // Verifica se o jogo foi vencido com base no número de vitórias e no tamanho do array de valores de cartas
  isGameWon(cardValues) {
    return this.winCount === Math.floor(cardValues.length / 2);
  }
}
