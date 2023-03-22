export const ShipConstructor = (name) =>  {
  const ships = {
    destroyer: 2,
    submarine: 3,
    cruiser: 3,
    battleship: 4,
    carrier: 5,
  }

  const ship = {
    name: name,
    hp: ships[name],
    length: ships[name],
    isHit: function() {
      this.hp -= 1
    },
    isSunk: function() {
      return this.hp <= 0
    }
  }

  return ship
}
