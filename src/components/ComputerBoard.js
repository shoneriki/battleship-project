// In PlayerBoard.js
import classNames from "classnames"

import { useState, useEffect } from "react";
import { ShipConstructor } from "./ShipConstructor";
import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  Square,
  ComSquare,
  ShipInfo,
  Labels,
} from "./StyledComponents";



const ComputerBoard= ({
  comBoard,
  gameOn,
  turn,
  attackCom,
  comShips,
}) => {
  const firstBoard = (boardSize) => {
    return Array.from({ length: boardSize }, (_, v) =>
      Array.from({ length: boardSize }, (_, h) => ({
        v,
        h,
        hasShip: 0,
      }))
    );
  };
  const [boardSize] = useState(10);
  const [board, setBoard] = useState(firstBoard(boardSize));

  
  return (
    <Board>
      <BoardBody data-testid="THISBOARD">
        {board.map((row, v) => (
          <TableRow key={v}>
            {row.map((cell, h) => (
              <ComSquare
                key={`${v}, ${h}`}
                v={cell.v}
                h={cell.h}
                hasShip={cell.hasShip}
                onClick={
                  gameOn ? () => attackCom(v, h, comBoard, comShips) : null
                }
                className={classNames({
                  hit: cell.hit,
                  miss: cell.miss,
                  default: !cell.hit && !cell.miss,
                })}
                gameOn={gameOn}
                data-testid={`cell-${v}-${h}`}
                style={{
                  cursor: gameOn && turn === "player" ? "pointer" : "default",
                }}
              ></ComSquare>
            ))}
          </TableRow>
        ))}
      </BoardBody>
    </Board>
  );
};
export default ComputerBoard
