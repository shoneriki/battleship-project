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
  } = GameboardConstructor()

  const [ship, setShip] = useState(ShipConstructor("carrier"))
  const [updatedBoard, setUpdatedBoard] = useState(board)
  const [direction, setDirection] = useState("h")
  const [shipsPlaced, setShipsPlaced] = useState(false)

  const changeDirection = (e, direction) => {
    direction === "h" ? setDirection("v") : setDirection("h")
  }

  const Info = ({Player, shipName, shipLength, direction}) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        <ShipInfo>
          {Player !== "Computer" && shipsPlaced === false && (
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
              <button onClick={(e) => setShip(ShipConstructor("carrier"))}>
                {ShipConstructor("carrier").name}
              </button>
              <button onClick={(e) => setShip(ShipConstructor("battleship"))}>
                {ShipConstructor("battleship").name}
              </button>
              <button onClick={(e) => setShip(ShipConstructor("cruiser"))}>
                {ShipConstructor("cruiser").name}
              </button>
              <button onClick={(e) => setShip(ShipConstructor("submarine"))}>
                {ShipConstructor("submarine").name}
              </button>
              <button onClick={(e) => setShip(ShipConstructor("destroyer"))}>
                {ShipConstructor("destroyer").name}
              </button>
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
          {board.map((row, v) => (
            <TableRow key={v}>
              {row.map((cell, h) => (
                <Square
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  backgroundColor={cell.hasShip ? "red" : "white"}
                  style={{
                    backgroundColor: cell.hasShip ? "red" : "blue",
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
export default PlayerArea
