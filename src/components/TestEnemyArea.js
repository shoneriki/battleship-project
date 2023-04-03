// In PlayerBoard.js
import classNames from "classnames"
import { useState, useEffect } from "react";
import { ShipConstructor } from "./ShipConstructor";

import {
  Board,
  BoardBody,
  TableRow,
  ComSquare,
} from "./StyledComponents";

const TestEnemyArea = ({Player,comBoard, comShips, gameOn, attackCom, turn}) => {
  
  const TestComputerBoard = () => {
    return (
      <Board>
        <BoardBody data-testid="test-board">
          {comBoard.map((row, v) => (
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
                  data-testid={`${Player}-cell-${v}-${h}`}
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

  return (
    <section>
      <TestComputerBoard Player={"Computer"} />
    </section>
  );
}



export default TestEnemyArea
