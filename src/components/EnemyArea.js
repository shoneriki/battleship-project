import { useState} from "react";
import { ShipConstructor } from "./ShipConstructor";
import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  Square,
  ShipInfo,
} from "./StyledComponents";

const EnemyArea = ({
  Player,
  comBoard,
  boardSize,
  comShips,
  comPlaceAllShips,
  handlePlaceComputerShips,
}) => {
  const Info = ({ Player }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        <button
          onClick={handlePlaceComputerShips}
        >
          Place Ships
        </button>
      </>
    );
  };

  const PlayerBoard = ({ Player }) => {
    return (
      <Board>
        <BoardBody data-testid={`${Player}-board`}>
          {comBoard.map((row, v) => (
            <TableRow key={v}>
              {row.map((cell, h) => (
                <Square
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  backgroundColor={cell.hasShip ? "red" : "blue"}
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
