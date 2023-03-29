import { useState, useEffect} from "react";
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
          {allComShipsPlaced && (
            <ShipInfo data-testid={`${Player}-ship-info`}>
              {comShips.map((ship) => {
                return (
                  <div key={ship.name}>
                    <h6>{ship.name}</h6>
                    <h6>{ship.hp}</h6>
                  </div>
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
                  onClick={gameOn ? () => attackCom(v, h, comBoard, comShips) : null}
                  hit={hit}
                  miss={miss}
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
