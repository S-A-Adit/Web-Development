class Ship {
  constructor(length, type = null) {
    if (typeof length !== "number" || length <= 0) {
      throw new Error("Ship length must be a positive number");
    }
    this.length = length;
    this.type = type || this.constructor.name; // e.g., "Carrier", "Battleship"
    this.hits = new Set(); // Tracks which positions are hit
    this.positions = []; // {x, y} coordinates the ship occupies
  }

  hit(positionIndex) {
    if (positionIndex >= 0 && positionIndex < this.length) {
      this.hits.add(positionIndex);
      return true;
    }
    return false;
  }

  isSunk() {
    return this.hits.size >= this.length;
  }

  isPositionHit(positionIndex) {
    return this.hits.has(positionIndex);
  }
}

export default Ship;
