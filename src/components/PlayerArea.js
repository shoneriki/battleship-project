import {useState} from "react"
import styled from "styled-components"
import {GameboardConstructor} from "./GameboardConstructor"
import {ShipConstructor} from "./ShipConstructor"
import {PlayerTitle, Board, BoardBody, TableRow, Square, ShipInfo} from "./StyledComponents"

const PlayerArea = ({Player}) => {
  const {
    board,
    placeShip,
    shipCoords,
    totalShipParts,
    shipsToBePlaced,
  } = GameboardConstructor()

  const [ship, setShip] = useState(ShipConstructor("carrier"))
  const [gameboard, setGameboard] = useState(board)
  const [direction, setDirection] = useState("h")
  const [unplacedShips, setUnplacedShips] = useState(shipsToBePlaced)
  const [shipsPlaced, setShipsPlaced] = useState(false)

  const changeDirection = (e, direction) => {
    direction === "h" ? setDirection("v") : setDirection("h")
  }

  const handleShipPlacement = (v,h, ship, direction, gameboard) => {
    const {board, shipsToBePlaced, totalShipParts, shipCoords} = placeShip(ship, v, h, direction, gameboard)
    console.log("board from handleShipPlacement", board)
    for(const [v,h] of shipCoords) {
      board[v][h].hasShip = ship.name.slice(0, 3);
    }
    setGameboard([...board])
    setUnplacedShips(shipsToBePlaced)
  }

  const Info = ({Player, shipName, shipLength, direction}) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        <ShipInfo>
          {Player !== "Computer" && !shipsPlaced && (
            <section className="ShipSelector">
              <h6>Please Select Ship and orientation</h6>
              <button onClick={(e) => changeDirection(e, direction)}>
                change direction
              </button>
              <h6>
                Please place <mark>{shipName}</mark> with{" "}
                <mark>{direction === "h" ? "horizontal" : "vertical"}</mark>{" "}
                length of <mark>{shipLength}</mark> on the board
              </h6>
              {
                unplacedShips.map((ship) => {
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
          {gameboard.map((row, v) => (
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
                      handleShipPlacement(v, h, ship, direction, gameboard);
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
