import GameBoard from "./GameBoard";

class Player {
  constructor(type = "human", name = "Player") {
    if (!["human", "computer"].includes(type)) {
      throw new Error("Player type must be either 'human' or 'computer'");
    }
    this.type = type;
    this.name = name;
    this.gameBoard = new GameBoard();
    this.previousAttacks = new Set();
  }

  attack(opponent, x, y) {
    if (this.type === "human") {
      return this.humanAttack(x, y, opponent);
    } else {
      return this.computerAttack(opponent);
    }
  }

  placeShipsRandomly(shipsLengths = [5, 4, 3, 2]) {
    if (this.type !== "computer") return;
    shipsLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const isVertical = Math.random() > 0.5;
        placed = this.gameBoard.placeShip(x, y, length, isVertical);
      }
    });
  }

  humanAttack(x, y, opponent) {
    if (typeof x !== "number" || typeof y !== "number") {
      return false;
    }
    const attackKey = `${x},${y}`;
    if (this.previousAttacks.has(attackKey)) {
      return false;
    }
    this.previousAttacks.add(attackKey);
    return opponent.gameBoard.receiveAttack(x, y);
  }

  computerAttack(opponent) {
    // First try smart targeting
    const smartTarget = this.findAdjacentTarget(opponent);
    if (smartTarget) {
      return this.executeAttack(opponent, smartTarget.x, smartTarget.y);
    }

    // Fallback to random attack
    let x, y, attackKey;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      attackKey = `${x},${y}`;
    } while (this.previousAttacks.has(attackKey));

    return this.executeAttack(opponent, x, y);
  }

  findAdjacentTarget(opponent) {
    // Find any hit that hasn't been fully explored
    for (const attack of this.previousAttacks) {
      const [x, y] = attack.split(",").map(Number);
      const ship = opponent.gameBoard.getShipAt(x, y);
      if (!ship || ship.isSunk()) continue;

      const directions = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      // Filter valid adjacent cells
      const validTargets = directions.filter(([nx, ny]) => {
        const key = `${nx},${ny}`;
        return (
          nx >= 0 &&
          nx < 10 &&
          ny >= 0 &&
          ny < 10 &&
          !this.previousAttacks.has(key)
        );
      });

      if (validTargets.length > 0) {
        const [nx, ny] =
          validTargets[Math.floor(Math.random() * validTargets.length)];
        return { x: nx, y: ny };
      }
    }
    return null;
  }

  executeAttack(opponent, x, y) {
    const attackKey = `${x},${y}`;
    this.previousAttacks.add(attackKey);
    return opponent.gameBoard.receiveAttack(x, y);
  }
  randomAttack(opponent) {
    let x, y, attackKey;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      attackKey = `${x},${y}`;
    } while (this.previousAttacks.has(attackKey));

    return this.executeAttack(opponent, x, y);
  }
}

export default Player;
