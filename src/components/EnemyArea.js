import { useState } from "react";
import styled from "styled-components";
import { GameboardConstructor } from "./GameboardConstructor";
import { ShipConstructor } from "./ShipConstructor";
import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  Square,
  ShipInfo,
} from "./StyledComponents";

const EnemyArea = ({ Player }) => {
  const { board, placeShip, shipCoords, totalShipParts } = GameboardConstructor();

  const Info = ({ Player }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        <ShipInfo>{Player !== "Computer" && <h3></h3>}</ShipInfo>
      </>
    );
  };

  const PlayerBoard = ({ Player }) => {
    return (
      <Board>
        <BoardBody data-testid={`${Player}-board`}>
          {board.map((row, v) => (
            <TableRow key={v}>
              {row.map((cell, h) => (
                <Square
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  backgroundColor={cell.hasShip ? "red" : "white"}
                  style={{
                    backgroundColor: cell.hasShip ? "red" : "blue",
                  }}
                ></Square>
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
      <Info Player={Player} />
      <PlayerBoard Player={Player} />
    </section>
  );
};
export default EnemyArea;
