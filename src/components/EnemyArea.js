import { useState, useEffect } from "react";
import styled from "styled-components";
import { GameboardConstructor } from "./GameboardConstructor";
import { ShipConstructor } from "./ShipConstructor";
import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  Square,
  ShipInfo,
} from "./StyledComponents";

const EnemyArea = ({ Player, gameboard }) => {

  const [shipsToBePlaced, setShipsToBePlaced] = useState(
    [
      ShipConstructor("carrier"),
      ShipConstructor("battleship"),
      ShipConstructor("cruiser"),
      ShipConstructor("submarine"),
      ShipConstructor("destroyer"),
    ]
  )
  const [computerBoard, setComputerBoard] = useState(gameboard)
  const [allShipsPlaced, setAllShipsPlaced] = useState(false)
  const [placedShips, setPlacedShips] = useState([])

  const Info = ({ Player }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
      </>
    );
  };

  const PlayerBoard = ({ Player }) => {
    return (
      <Board>
        <BoardBody data-testid={`${Player}-board`}>
          {computerBoard.map((row, v) => (
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
  };

  // v for vertical, h for horizontal
  return (
    <section>
      <Info Player={Player} />
      <PlayerBoard Player={Player} />
    </section>
  );
};
export default EnemyArea;
