import { useState} from "react";
import { ShipConstructor } from "./ShipConstructor";
import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  Square,
  ComSquare,
  ShipInfo,
} from "./StyledComponents";

const EnemyArea = ({
  Player,
  comBoard,
  boardSize,
  comShips,
  comPlaceAllShips,
  handlePlaceComputerShips,
  allComShipsPlaced,
  gameOn,
}) => {
  const Info = ({ Player }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        {
          !allComShipsPlaced && (
            <button
              onClick={handlePlaceComputerShips}
              data-testid={`${Player}-place-ships-btn`}
            >
              Place Ships
            </button>
          )
        } 
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
                <ComSquare
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  gameOn={gameOn}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  style={{
                    backgroundColor: "blue",
                    cursor: gameOn ? "pointer" : "default",
                  }}
                ></ComSquare>
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
