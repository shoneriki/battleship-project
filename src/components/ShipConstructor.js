const ShipConstructor = (name) =>  {
  const shipNames = {
    destroyer: 2,
    submarine: 3,
    cruiser: 3,
    battleship: 4,
    carrier: 5,
  }

  let hp = shipNames[name]


  return {
    name: name,
    hp: hp,
    isSunk: () => {
      return hp > 0 ? false : true
    },
    isHit: () => {
      // need to check if cell is occupied by ship part somehow
      // if cell is occupied by ship part
      hp -= 1
    }
  }
}

export default ShipConstructor
