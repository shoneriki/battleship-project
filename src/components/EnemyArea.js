import { useState, useEffect} from "react";
import { ShipConstructor } from "./ShipConstructor";
import classNames from "classnames"
import {
  PlayerTitle,
  InfoContainer,
  ShipInfo,
  Labels,
  ShipStats,
  StyledBtn,
  Board,
  BoardBody,
  TableRow,
  ComSquare,
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
      <InfoContainer>
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
          <h6>Ships Placed</h6>
          {allComShipsPlaced && (
            <ShipInfo data-testid={`${Player}-ship-info`}>
              {comShips.map((ship) => {
                return (
                  <ShipStats key={ship.name}>
                    <h6>
                      {ship.name.charAt(0).toUpperCase() + ship.name.slice(1)}
                    </h6>
                    <h6>
                      Length:
                      <br/>
                      {ship.length}
                    </h6>
                  </ShipStats>
                );
              })}
            </ShipInfo>
          )}
        </section>
      </InfoContainer>
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
