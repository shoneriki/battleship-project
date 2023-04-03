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

  ShipDashboard,
  ShipSelector,


} from "./StyledComponents";

const TestPlayerArea = ({Player, playerBoard, playerShips, gameOn, attackPlayer, turn}) => {

    const TestInfo = ({ Player }) => {
      return (
        <>
          <PlayerTitle>{Player}</PlayerTitle>
          <section>
            {gameOn && (
              <ShipInfo data-testid={`${Player}-ship-info`}>
                {playerShips.map((ship) => {
                  return (
                    <ShipStats data-testid={`${ship}-stats`} key={ship.name}>
                      <h6 data-testid={`${ship}-name`}>{ship.name}</h6>
                      <h6 data-testid={`${ship}-hp`}>hp: {ship.hp}</h6>
                    </ShipStats>
                  );
                })}
              </ShipInfo>
            )}
          </section>
        </>
      );
    };

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
      <TestInfo Player={"Player"}/>
      <TestPlayerBoard Player={"Player"} />
    </section>
  )
}
export default TestPlayerArea
