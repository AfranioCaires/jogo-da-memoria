const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let firstCardValue = ""; // Adicionar declaração de variável faltante
let tempFirst; // Adicionar declaração de variável faltante

// Array de itens
const items = [
  { name: "bee", img: "../img/bee.png" },
  { name: "crocodile", img: "img/crocodile.png" },
  { name: "macaw", img: "img/macaw.png" },
  { name: "gorilla", img: "img/gorilla.png" },
  { name: "tiger", img: "img/tiger.png" },
  { name: "monkey", img: "img/monkey.png" },
  { name: "chameleon", img: "img/chameleon.png" },
  { name: "piranha", img: "img/piranha.png" },
  { name: "anaconda", img: "img/anaconda.png" },
  { name: "sloth", img: "img/sloth.png" },
  { name: "cockatoo", img: "img/cockatoo.png" },
  { name: "toucan", img: "img/toucan.png" },
];

// Tempo inicial
let seconds = 0,
  minutes = 0;
// Contagem inicial de movimentos e vitórias
let movesCount = 0,
  winCount = 0;

// Para o temporizador
const timeGenerator = () => {
  seconds += 1;
  // Lógica dos minutos
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  // Formata o tempo antes de exibir
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Tempo:</span>${minutesValue}:${secondsValue}`;
};

// Para calcular os movimentos
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Movimentos:</span>${movesCount}`;
};

// Seleciona objetos aleatórios do array de itens
const generateRandom = (size = 4) => {
  // Array temporário
  let tempArray = [...items];
  // Inicializa o array de valores das cartas
  let cardValues = [];
  // O tamanho deve ser o dobro (matriz 4x4) / 2, pois haverá pares de objetos
  size = (size * size) / 2;
  // Seleção aleatória de objetos
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    // Remove o objeto do array temporário após selecioná-lo
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  // Embaralha os valores das cartas
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Cria as cartas
        antes => lado da frente (contém ponto de interrogação)
        depois => lado de trás (contém a imagem real);
        data-card-values é um atributo personalizado que armazena os nomes das cartas para fazer a correspondência posteriormente
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].img}" class="image"/></div>
     </div>
     `;
  }
  // Grade
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  // Cartas
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Se a carta selecionada ainda não foi combinada, execute (ou seja, uma carta já combinada quando clicada será ignorada)
      if (!card.classList.contains("matched")) {
        // Vira a carta clicada
        card.classList.add("flipped");
        // Se for a primeira carta (!firstCard, pois firstCard é inicialmente false)
        if (!firstCard) {
          // A carta atual se torna a primeira carta
          firstCard = card;
          // O valor da carta atual se torna o valor da primeira carta
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          // Incrementa os movimentos, pois o usuário selecionou a segunda carta
          movesCounter();
          // Segunda carta e valor
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            // Se as duas cartas forem iguais, adiciona a classe "matched" para que essas cartas sejam ignoradas da próxima vez
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            // Define firstCard como false, pois a próxima carta será a primeira agora
            firstCard = false;
            // Incrementa winCount, pois o usuário encontrou uma correspondência correta
            winCount += 1;
            // Verifica se winCount é igual à metade do tamanho de cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Você Venceu</h2>
            <h4>Movimentos: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            // Se as cartas não forem iguais
            // Vira as cartas de volta ao normal
            [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

// Inicia o jogo
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  // Visibilidade dos controles e botões
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  // Inicia o temporizador
  interval = setInterval(timeGenerator, 1000);
  // Movimentos iniciais
  moves.innerHTML = `<span>Movimentos:</span> ${movesCount}`;
  initializer();
});

// Para o jogo
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

// Inicializa valores e chamadas de função
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
