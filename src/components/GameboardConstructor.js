import {ShipConstructor} from "./ShipConstructor"
export const GameboardConstructor = () => {
  const BOARD_SIZE = 10
  const board = Array.from({length: BOARD_SIZE}, (_,v) => Array.from({length: BOARD_SIZE}, (_,h) => ({
    v,
    h,
    hasShip: 0,
  })))
  const shipsToBePlaced = [
    ShipConstructor("carrier"),
    ShipConstructor("battleship"),
    ShipConstructor("cruiser"),
    ShipConstructor("submarine"),
    ShipConstructor("destroyer"),
  ];
  const shipCoords = [];
  const totalShipParts = [];
  const placeShip = (ship, v, h, direction, board) => {
    const {length} = ship;
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
          shipCoords.push([ v, h + i]);
          board[v][h+i].hasShip = ship.name.slice(0,3);
        } else {
          shipCoords.push([v + i, h]);
          board[v+i][h].hasShip = ship.name.slice(0,3)
        }
        totalShipParts.push(ship.name.slice(0, 3));
      }
      if(totalShipParts.includes(ship.name.slice(0,3))){
        const removeShipIndex = shipsToBePlaced.findIndex(
          (item) => item.name === ship.name
        );
        shipsToBePlaced.splice(removeShipIndex, 1);
      }
    }
    return {board, shipsToBePlaced, totalShipParts, shipCoords}
  }

  return {
    board,
    placeShip,
    shipCoords,
    totalShipParts,
    shipsToBePlaced,
  }
}
