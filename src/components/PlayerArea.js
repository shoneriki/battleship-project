import {useState} from "react"
import styled from "styled-components"
import {GameboardConstructor} from "./GameboardConstructor"
import {ShipConstructor} from "./ShipConstructor"
import {PlayerTitle, Board, BoardBody, TableRow, Square, ShipInfo} from "./StyledComponents"

const PlayerArea = ({Player}) => {
  const {
    boat
  } = ShipConstructor()

  const [ship, setShip] = useState(ShipConstructor("carrier"))
  const [boardSize, setBoardSize] = useState(10)
  const [playerBoard, setPlayerBoard] = useState(
    Array.from({ length: boardSize }, (_, v) =>
      Array.from({ length: boardSize }, (_, h) => ({
        v,
        h,
        hasShip: 0,
      }))
    )
  );
  const [direction, setDirection] = useState("h")
  const [shipsToBePlaced, setShipsToBePlaced] = useState(
    ["carrier", "battleship", "cruiser", "submarine", "destroyer"].map((name) =>
      ShipConstructor(name)
    )
  );

  const [allShipsPlaced, setAllShipsPlaced] = useState(false)
  const [shipCoords, setShipCoords] = useState([])
  const [placedShips, setPlacedShips] = useState([])

  const changeDirection = (e, direction) => {
    direction === "h" ? setDirection("v") : setDirection("h")
  }

  const placeShip = (ship, v, h, direction, board) => {
    const newPlacedShips = [...placedShips];
    const newBoard = playerBoard.map(row => [...row])

    const { length } = ship;
    console.log("length", length)
    let hIncrement, vIncrement;
    if (direction === "h") {
      vIncrement = 0;
      hIncrement = 1;
    } else {
      vIncrement = 1;
      hIncrement = 0;
    }
    const hEnding = h + ship.length * hIncrement;
    const vEnding = v + ship.length * vIncrement;
    const placementValid = (v, h) => {
      // check if ship is out of bounds
      if (vEnding > 10 || hEnding > 10 || v < 0 || h < 0) {
        throw new Error("Ship is out of bounds");
      }

      // check if ship is overlapping another ship
      for (let i = 0; i < length; i++) {
        if (direction === "h") {
          if (newBoard[v][h + i].hasShip) {
            throw new Error("Ship is overlapping another ship");
          }
        } else {
          if (newBoard[v + i][h].hasShip) {
            throw new Error("Ship is overlapping another ship");
          }
        }
        return true;
      }
    };

    if (placementValid(v, h)) {
      for (let i = 0; i < length; i++) {
        if (direction === "h") {
          shipCoords.push([v, h + i]);
          newBoard[v][h + i].hasShip = ship.name.slice(0, 3);
          console.log("newBoard inside horizontal check",newBoard)
        } else {
          shipCoords.push([v + i, h]);
          newBoard[v + i][h].hasShip = ship.name.slice(0, 3);
        }
        newPlacedShips.push(ship.name.slice(0, 3));
      }
      const shipIndex = shipsToBePlaced.findIndex((item) => item.name === ship.name);
      if (newPlacedShips.includes(ship.name.slice(0, 3))) {
        const newShipsToBePlaced = [...shipsToBePlaced];
        newShipsToBePlaced.splice(shipIndex, 1);
        setShipsToBePlaced(newShipsToBePlaced);
      }
    }
    return { board, shipsToBePlaced, shipCoords };
  };

  const Info = ({Player, direction}) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        <ShipInfo>
          {Player !== "Computer" && shipsToBePlaced !== 17 && (
            <section className="ShipSelector">
              <button onClick={(e) => changeDirection(e, direction)}>
                change direction to {direction === "h" ? "vertical" : "horizontal"}
              </button>
              <h3>{ship.name}</h3>
              {
                shipsToBePlaced.map((ship) => {
                    return (
                      <button key={ship.name} onClick={(e) => setShip(ship)}>
                        {ship.name}
                      </button>
                    )
                }
                )
              }
            </section>
          )}
        </ShipInfo>
      </>
    );
  }

  const PlayerBoard = ({Player}) => {
    return (
      <Board>
        <BoardBody data-testid={`${Player}-board`}>
          {playerBoard.map((row, v) => (
            <TableRow key={v}>
              {row.map((cell, h) => (
                <Square
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  style={{
                    backgroundColor: cell.hasShip ? "green" : "blue",
                  }}
                  onClick={() => {
                    try {
                      placeShip(ship, v, h, direction, playerBoard);
                    } catch (error) {
                      alert(error.message);
                    }
                  }}
                ></Square>
              ))}
            </TableRow>
          ))}
        </BoardBody>
      </Board>
    );
  }

    // v for vertical, h for horizontal
  return (
    <section>
      <Info
        Player={Player}
        shipName={ship.name}
        shipLength={ship.length}
        direction={direction}
      />
      <PlayerBoard
        Player={Player}
      />
    </section>
  );
}

export default PlayerArea;
