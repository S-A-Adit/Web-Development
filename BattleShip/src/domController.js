export function renderGameBoards(player, computer, gameState) {
  const playerBoard = document.getElementById("player-board");
  const computerBoard = document.getElementById("computer-board");

  playerBoard.innerHTML = "";
  computerBoard.innerHTML = "";

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      // Player board
      const playerCell = document.createElement("div");
      playerCell.className = "cell";
      playerCell.dataset.x = x;
      playerCell.dataset.y = y;

      const hasShip = player.gameBoard.getShipAt(x, y);
      if (hasShip) playerCell.classList.add("ship");

      const computerAttack = player.gameBoard.getAttackResult(x, y);
      if (computerAttack) {
        playerCell.classList.add(computerAttack);
        if (computerAttack === "hit" && hasShip?.isSunk()) {
          playerCell.classList.add("sunk");
        }
      } else if (gameState.phase === "placement") {
        playerCell.addEventListener("click", () =>
          handlePlacementClick(x, y, player, computer, gameState)
        );
        playerCell.addEventListener("mouseover", () =>
          highlightPlacement(x, y, player, gameState)
        );
      }

      playerBoard.appendChild(playerCell);

      // Computer board
      const computerCell = document.createElement("div");
      computerCell.className = "cell";
      computerCell.dataset.x = x;
      computerCell.dataset.y = y;

      const playerAttack = computer.gameBoard.getAttackResult(x, y);
      if (playerAttack) {
        computerCell.classList.add(playerAttack);
        if (playerAttack === "hit") {
          const ship = computer.gameBoard.getShipAt(x, y);
          if (ship?.isSunk()) {
            ship.positions.forEach((pos) => {
              const sunkCell = document.querySelector(
                `#computer-board [data-x="${pos.x}"][data-y="${pos.y}"]`
              );
              sunkCell?.classList.add("sunk");
            });
          }
        }
      } else if (gameState.phase === "battle") {
        computerCell.addEventListener("click", () => {
          if (!gameState.over) handlePlayerAttack(x, y);
        });
      }

      computerBoard.appendChild(computerCell);
    }
  }

  // Highlight potential placement during placement phase
  if (gameState.phase === "placement") {
    highlightPlacement(0, 0, player, gameState);
  }
}

function highlightPlacement(x, y, player, gameState) {
  clearHighlights();

  if (gameState.phase !== "placement") return;

  const currentShip = gameState.shipsToPlace[gameState.currentShip];
  const length = currentShip.length;
  const isVertical = gameState.isVertical;

  let isValid = true;

  for (let i = 0; i < length; i++) {
    const nx = isVertical ? x : x + i;
    const ny = isVertical ? y + i : y;

    const cell = document.querySelector(
      `#player-board [data-x="${nx}"][data-y="${ny}"]`
    );
    if (!cell || player.gameBoard.getShipAt(nx, ny)) {
      isValid = false;
      break;
    }
  }

  for (let i = 0; i < length; i++) {
    const nx = isVertical ? x : x + i;
    const ny = isVertical ? y + i : y;

    const cell = document.querySelector(
      `#player-board [data-x="${nx}"][data-y="${ny}"]`
    );
    if (cell) {
      cell.classList.add(isValid ? "placement-valid" : "placement-invalid");
    }
  }
}

function clearHighlights() {
  document
    .querySelectorAll(".placement-valid, .placement-invalid")
    .forEach((cell) => {
      cell.classList.remove("placement-valid", "placement-invalid");
    });
}

function handlePlacementClick(x, y, player, computer, gameState) {
  if (gameState.phase !== "placement") return;

  const currentShip = gameState.shipsToPlace[gameState.currentShip];
  const placed = player.gameBoard.placeShip(
    x,
    y,
    currentShip.length,
    gameState.isVertical
  );

  if (placed) {
    gameState.currentShip++;

    if (gameState.currentShip >= gameState.shipsToPlace.length) {
      startBattlePhase();
    } else {
      const nextShip = gameState.shipsToPlace[gameState.currentShip];
      displayMessage(`Place your ${nextShip.name} (${nextShip.length} cells)`);
      renderGameBoards(player, computer, gameState);
    }
  }
}

export function setupShipPlacementUI(player, computer, gameState) {
  const rotateBtn = document.getElementById("rotate-btn");
  const randomBtn = document.getElementById("random-btn");

  rotateBtn?.addEventListener("click", () => {
    gameState.isVertical = !gameState.isVertical;
    renderGameBoards(player, computer, gameState);
  });

  randomBtn?.addEventListener("click", () => {
    player.gameBoard.ships = []; // Clear existing ships

    gameState.shipsToPlace.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.random() > 0.5;
        placed = player.gameBoard.placeShip(x, y, ship.length, isVertical);
      }
    });

    startBattlePhase();
  });

  renderGameBoards(player, computer, gameState);
}

export function updateGameBoard(boardType, x, y, isHit, computer) {
  const cell = document.querySelector(
    `#${boardType}-board [data-x="${x}"][data-y="${y}"]`
  );
  if (!cell) return;

  cell.classList.add(isHit ? "hit" : "miss");
  cell.style.pointerEvents = "none";

  if (isHit && boardType === "computer") {
    const ship = computer.gameBoard.getShipAt(x, y);
    if (ship?.isSunk()) {
      ship.positions.forEach((pos) => {
        const sunkCell = document.querySelector(
          `#${boardType}-board [data-x="${pos.x}"][data-y="${pos.y}"]`
        );
        sunkCell?.classList.add("sunk");
      });
    }
  }
}

export function displayMessage(message) {
  const messageElement = document.getElementById("game-message");
  messageElement.textContent = message;
}
