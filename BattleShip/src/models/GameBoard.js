import Ship from "./Ship.js";
class GameBoard {
  constructor() {
    this.boardSize = 10;
    this.ships = [];
    this.missedAttacks = new Set();
    this.hitAttacks = new Set();
    this.allAttacks = new Set();
  }

  placeShip(x, y, length, isVertical = false) {
    if (
      !this.areValidCoordinate(x, y) ||
      typeof length !== "number" ||
      length <= 0
    ) {
      return false;
    }
    const positions = [];
    for (let i = 0; i < length; i++) {
      const newX = isVertical ? x : x + i;
      const newY = isVertical ? y + i : y;
      if (!this.areValidCoordinate(newX, newY)) {
        return false;
      }
      if (this.getShipAt(newX, newY)) {
        return false;
      }
      positions.push({ x: newX, y: newY });
    }
    const ship = new Ship(length);
    ship.positions = positions;
    this.ships.push(ship);
    return true;
  }

  getAttackResult(x, y) {
    const attackKey = `${x},${y}`;
    if (this.hitAttacks.has(attackKey)) return "hit";
    if (this.missedAttacks.has(attackKey)) return "miss";
    return null;
  }

  // Update receiveAttack to track all attacks
  receiveAttack(x, y) {
    if (!this.areValidCoordinate(x, y)) return false;

    const attackKey = `${x},${y}`;
    if (this.allAttacks.has(attackKey)) return false;

    this.allAttacks.add(attackKey);

    const ship = this.getShipAt(x, y);
    if (ship) {
      const positionIndex = ship.positions.findIndex(
        (pos) => pos.x === x && pos.y === y
      );
      ship.hit(positionIndex);
      this.hitAttacks.add(attackKey);
      return true;
    } else {
      this.missedAttacks.add(attackKey);
      return false;
    }
  }

  allShipSink() {
    return this.ships.length > 0 && this.ships.every((ship) => ship.isSunk());
  }

  areValidCoordinate(x, y) {
    return (
      Number.isInteger(x) &&
      Number.isInteger(y) &&
      x >= 0 &&
      x < this.boardSize &&
      y >= 0 &&
      y < this.boardSize
    );
  }

  getShipAt(x, y) {
    return this.ships.find((ship) =>
      ship.positions.some((pos) => pos.x === x && pos.y === y)
    );
  }
}
export default GameBoard;
