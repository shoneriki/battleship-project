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
  boardSize,
  comShips,
  setComShips,
  comPlaceAllShips,
  handlePlaceComputerShips,
  allComShipsPlaced,
  gameOn,
  receiveAttack,
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
                  onClick={
                    gameOn
                      ? (event) => {
                          const [hit, miss] = receiveAttack(
                            v,
                            h,
                            comBoard,
                            comShipSegmentsOnBoard,
                            comShips,
                            setComShips,
                          );
                          if (hit) {
                            event.target.classList.add("hit");
                          } else if (miss) {
                            event.target.classList.add("miss");
                          }
                        }
                      : null
                  }
                  gameOn={gameOn}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  style={{
                    backgroundColor: cell.hasShip ? "purple" : "blue",
                    "cursor": gameOn ? "pointer" : "default",
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
