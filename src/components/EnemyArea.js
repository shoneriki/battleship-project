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
  ShipName,
  IndivStats,

  PlayerAreaWrap,

  EnemyScoreDisplay,

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
      <InfoContainer name="InfoContainer">
        <PlayerTitle>{Player}</PlayerTitle>
        {/* {!allComShipsPlaced && (
          <StyledBtn
            // onClick={handlePlaceComputerShips}
            data-testid={`${Player}-place-ships-btn`}
          >
            Place Ships
          </StyledBtn>
        )} */}
        <EnemyScoreDisplay name="EnemyScoreDisplay">
          <h6>Ships Placed</h6>
          {allComShipsPlaced && (
            <ShipInfo data-testid={`${Player}-ship-info`}>
              {comShips.map((ship) => {
                return (
                  <ShipStats key={ship.name}>
                    <ShipName>
                      {ship.name.charAt(0).toUpperCase() + ship.name.slice(1)}
                    </ShipName>
                    <IndivStats>
                      Length:
                      <br/>
                      {ship.length}
                    </IndivStats>
                  </ShipStats>
                );
              })}
            </ShipInfo>
          )}
        </EnemyScoreDisplay>
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
    <PlayerAreaWrap name="PlayerAreaWrap">
      <Info
        Player={Player}
        comShips={comShips}
        comShipSegmentsOnBoard={comShipSegmentsOnBoard}
        gameOn={gameOn}
        turn={turn}
      />
      <PlayerBoard Player={Player} winner={winner} />
    </PlayerAreaWrap>
  );
};
export default EnemyArea
