export const GameboardConstructor = () => {
  const BOARD_SIZE = 10
  const board = Array.from({length: BOARD_SIZE}, (_,x) => Array.from({length: BOARD_SIZE}, (_,y) => ({
    x: x,
    y: y,
    hasShip: 0,
  })))
  const placeShip = (ship, x, y, direction, board) => {
    const {length} = ship;
    const coords = [];
    let xIncrement, yIncrement;
    if(direction === "h") {
      xIncrement = 1;
      yIncrement = 0;
    } else {
      xIncrement = 0;
      yIncrement = 1;
    }
    const XEnding = x + ship.length * xIncrement;
    const YEnding = y + ship.length * yIncrement;

    const placementValid = (x,y) => {
      // check if ship is out of bounds
      if (XEnding > BOARD_SIZE || YEnding > BOARD_SIZE || x < 0 || y < 0) {
        throw new Error("Ship is out of bounds")
      }

      // check if ship is overlapping another ship
      for (let i = 0; i < length; i++) {
        if (direction === "h") {
          if (board[x+i][y].hasShip) {
            throw new Error("Ship is overlapping another ship")
          }
        } else {
          if (board[x][y+i].hasShip) {
            throw new Error("Ship is overlapping another ship")
          }
        }
        return true
      }




    }

    if(placementValid(x,y)) {
      for (let i = 0; i < length; i++) {
        if (direction === "h") {
          coords.push([ x + i, y]);
          board[x+i][y].hasShip = ship
        } else {
          coords.push([x, y + i]);
          board[x][y+i].hasShip = ship
        }
      }
    }

  }


  return {
    board,
    placeShip,
  }
}
