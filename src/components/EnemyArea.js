import { useState, useEffect} from "react";
import { ShipConstructor } from "./ShipConstructor";
import classNames from "classnames"
import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  ComSquare,
  ShipInfo,
  Labels,
  ShipStats,
  StyledBtn,
} from "./StyledComponents";

const EnemyArea = ({
  Player,
  comBoard,
  comShips,
  allComShipsPlaced,
  gameOn,
  winner,
  // attack logic
  attackCom,
  turn,
  comShipSegmentsOnBoard,
  // end attack logic
}) => {
  const Info = ({ Player, gameOn, turn }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        {/* {!allComShipsPlaced && (
          <StyledBtn
            // onClick={handlePlaceComputerShips}
            data-testid={`${Player}-place-ships-btn`}
          >
            Place Ships
          </StyledBtn>
        )} */}
        <section>
          {gameOn && turn === "Computer" && <h6> Computer's turn </h6>}
        </section>
        <section>
          <h6>Ships Placed</h6>
          {allComShipsPlaced && (
            <ShipInfo data-testid={`${Player}-ship-info`}>
              {comShips.map((ship) => {
                return (
                  <ShipStats key={ship.name}>
                    <h6>{ship.name}</h6>
                  </ShipStats>
                );
              })}
            </ShipInfo>
          )}
        </section>
      </>
    );
  };

  const PlayerBoard = ({ Player, winner }) => {
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
                    gameOn && winner === ""
                      ? () => attackCom(v, h, comBoard, comShips)
                      : null
                  }
                  className={classNames({
                    hit: cell.hit,
                    miss: cell.miss,
                    default: !cell.hit && !cell.miss,
                  })}
                  gameOn={gameOn}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  turn={turn}
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
        gameOn={gameOn}
        turn={turn}
      />
      <PlayerBoard Player={Player} winner={winner} />
    </section>
  );
};
export default EnemyArea
