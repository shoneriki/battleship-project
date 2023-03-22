import styled from "styled-components"
import {GameboardConstructor} from "./GameboardConstructor"
const Gameboard = ({Player}) => {
  const {
    board
  } = GameboardConstructor()

  const PlayerTitle = styled.h1`
    text-align: center;
  `;

  const Board = styled.table`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
    @media only screen and (max-width: 1300px) {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 30vh;
      width: 100%;
    }
  `;

  const TableRow = styled.tr`
    display: flex;
    width: 50%;
    height: 15%;
    @media only screen and (max-width: 800px) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media only screen and (min-width: 801px) and  (max-width: 1100px) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
  const Square = styled.td`
    border: 1px solid black;
    width: calc(10%);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10%;
    padding: 16px;
    font-size: 8px;

    @media only screen and (max-width: 800px) {
      width: calc(10% - 8px)
    }
    @media only screen and (min-width: 801px) and  (max-width: 1100px) {
      width: calc(10% - 64px)
    }

  `
  const ShipInfo = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  `

  // v for vertical, h for horizontal
  return (
    <Board>
      <PlayerTitle>{Player}</PlayerTitle>
      <ShipInfo>
        {
          Player !== "Computer" && (
            <h3></h3>
          )
        }
      </ShipInfo>
      {board.map((row, v) => (
        <TableRow key={v}>
          {row.map((cell, h) => (
            <Square
              key={`${v}, ${h}`}
              v={cell.v}
              h={cell.h}
              hasShip={cell.hasShip}
              data-testid={`cell-${v}-${h}`}
              backgroundColor={cell.hasShip ? "red" : "white"}
              style={{
                backgroundColor: cell.hasShip ? "red" : "blue",
              }}
              onHover={{ backgroundColor: "blue" }}
            ></Square>
          ))}
        </TableRow>
      ))}
    </Board>
  );
}
export default Gameboard
