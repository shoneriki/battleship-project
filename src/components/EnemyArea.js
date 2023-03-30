import { useState, useEffect} from "react";
import { ShipConstructor } from "./ShipConstructor";
import classNames from "classnames"
import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  Square,
  ComSquare,
  ShipInfo,
  Labels,
  ShipStats,
} from "./StyledComponents";

export const EnemyArea = ({
  Player,
  comBoard,
  setComBoard,
  boardSize,
  comShips,
  setComShips,
  handlePlaceComputerShips,
  allComShipsPlaced,
  gameOn,
  // attack logic
  attackCom,
  hit,
  setHit,
  miss,
  setMiss,
  turn,
  // end attack logic
  comShipSegmentsOnBoard,
}) => {

  const Info = ({ Player, comShips, comShipSegmentsOnBoard }) => {

    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        {!allComShipsPlaced && (
          <button
            onClick={handlePlaceComputerShips}
            data-testid={`${Player}-place-ships-btn`}
          >
            Place Ships
          </button>
        )}
        <section>
          {
            gameOn && turn === "computer" && (
              <h6> Computer's turn </h6>
            )
          }
        </section>
        <section>
          {gameOn && (
            <ShipInfo data-testid={`${Player}-ship-info`}>
              {comShips.map((ship) => {
                return (
                  <ShipStats key={ship.name}>
                    <h6>{ship.name}</h6>
                    <h6>hp: {ship.hp}</h6>
                  </ShipStats>
                );
              })}
            </ShipInfo>
          )}
        </section>
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

  // v for vertical, h for horizontal
  return (
    <section>
      <Info
        Player={Player}
        comShips={comShips}
        comShipSegmentsOnBoard={comShipSegmentsOnBoard}
      />
      <PlayerBoard Player={Player} />
    </section>
  );
};
export default EnemyArea;
