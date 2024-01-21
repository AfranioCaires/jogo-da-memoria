import { MemoryGameUI } from "./gameUI.js";

const memoryGame = new MemoryGameUI();

memoryGame.startButton.addEventListener("click", () => {
  memoryGame.startGame();
});

memoryGame.stopButton.addEventListener("click", () => {
  memoryGame.stopGame();
});
