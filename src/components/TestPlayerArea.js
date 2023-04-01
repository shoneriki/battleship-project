import classNames from 'classnames';
import {useState, useEffect} from 'react';
import {ShipConstructor} from './ShipConstructor';

import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  ComSquare,
  ShipInfo,
  Labels,
  ShipStats,
} from "./StyledComponents";

const TestPlayerArea = ({Player, playerBoard, playerShips, gameOn, attackPlayer, turn}) => {

  const TestPlayerBoard = () => {
    return (
      <Board>
        <BoardBody data-testid="test-board">
          {playerBoard.map((row, v) => (
            <TableRow key={v}>
              {row.map((cell, h) => (
                <ComSquare
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  className={classNames({
                    hit: cell.hit,
                    miss: cell.miss,
                    default: !cell.hit && !cell.miss,
                  })}
                  gameOn={gameOn}
                  data-testid={`${Player}-cell-${v}-${h}`}
                ></ComSquare>
              ))}
            </TableRow>
          ))}
        </BoardBody>
      </Board>
    );
  }
  return(
    <section>
      <TestPlayerBoard Player={"Player"} />
    </section>
  )
}
export default TestPlayerArea
