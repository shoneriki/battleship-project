import ShipConstructor from "./ShipConstructor"
export const GameboardConstructor = () => {
  const BOARD_SIZE = 10
  const board = Array.from({length: BOARD_SIZE}, (_,v) => Array.from({length: BOARD_SIZE}, (_,h) => ({
    v,
    h,
    hasShip: 0,
  })))
  const ships = [
    ShipConstructor("carrier"),
    ShipConstructor("battleship"),
    ShipConstructor("cruiser"),
    ShipConstructor("submarine"),
    ShipConstructor("destroyer"),
  ];
  const placeShip = (ship, v, h, direction, board) => {
    const {length} = ship;
    const coords = [];
    let hIncrement, vIncrement;
    if(direction === "h") {
      vIncrement = 0;
      hIncrement = 1;
    } else {
      vIncrement = 1;
      hIncrement = 0;
    }
    const hEnding = h + ship.length * hIncrement;
    const vEnding = v + ship.length * vIncrement;

    const placementValid = (v,h) => {
      // check if ship is out of bounds
      if (vEnding > BOARD_SIZE || hEnding > BOARD_SIZE || v < 0 || h < 0) {
        throw new Error("Ship is out of bounds")
      }

      // check if ship is overlapping another ship
      for (let i = 0; i < length; i++) {
        if (direction === "h") {
          if (board[v][h+i].hasShip) {
            throw new Error("Ship is overlapping another ship")
          }
        } else {
          if (board[v+i][h].hasShip) {
            throw new Error("Ship is overlapping another ship")
          }
        }
        return true
      }
    }

    if(placementValid(v,h)) {
      for (let i = 0; i < length; i++) {
        if (direction === "h") {
          coords.push([ v, h + i]);
          board[v][h+i].hasShip = ship
        } else {
          coords.push([v + i, h]);
          board[v+i][h].hasShip = ship
        }
      }
    }

  }

  return {
    board,
    placeShip,
  }
}
