import Player from "./models/Player.js";
import {
  renderGameBoards,
  updateGameBoard,
  displayMessage,
  setupShipPlacementUI,
} from "./domController.js";
import "./styles.css";

const player = new Player("human", "Player 1");
const computer = new Player("computer", "Computer");
let gameState = {
  phase: "placement", // 'placement' or 'battle'
  currentShip: 0,
  shipsToPlace: [
    { length: 5, name: "Carrier" },
    { length: 4, name: "Battleship" },
    { length: 3, name: "Cruiser" },
    { length: 2, name: "Destroyer" },
  ],
  isVertical: false,
  over: false,
};

function initGame() {
  // Computer always places ships randomly
  computer.placeShipsRandomly(
    gameState.shipsToPlace.map((ship) => ship.length)
  );

  // Setup UI for player ship placement
  setupShipPlacementUI(player, computer, gameState);
  displayMessage(
    `Place your ${gameState.shipsToPlace[0].name} (${gameState.shipsToPlace[0].length} cells)`
  );
}

function startBattlePhase() {
  gameState.phase = "battle";
  renderGameBoards(player, computer, gameState);
  displayMessage("Game started! Your turn.");
}

function handlePlayerAttack(x, y) {
  if (gameState.over || gameState.phase !== "battle") return;

  const isHit = player.attack(computer, x, y);
  if (isHit !== false) {
    updateGameBoard("computer", x, y, isHit, computer);

    if (computer.gameBoard.allShipSink()) {
      displayMessage("Congratulations! You won!");
      gameState.over = true;
      return;
    }

    setTimeout(computerTurn, 1000);
  }
}

function computerTurn() {
  if (gameState.over) return;

  const isHit = computer.attack(player);
  if (isHit !== false) {
    const lastAttack = [...computer.previousAttacks].pop();
    const [x, y] = lastAttack.split(",").map(Number);
    updateGameBoard("player", x, y, isHit, computer);

    if (player.gameBoard.allShipSink()) {
      displayMessage("Game over! Computer won!");
      gameState.over = true;
    } else {
      displayMessage("Your turn!");
    }
  }
}

// Global functions for UI interaction
window.handlePlayerAttack = handlePlayerAttack;
window.startBattlePhase = startBattlePhase;
window.gameState = gameState;

document.addEventListener("DOMContentLoaded", initGame);
