import styled from "styled-components"
import {GameboardConstructor} from "./GameboardConstructor"
const Gameboard = () => {
  const {
    board
  } = GameboardConstructor()

  const Board = styled.table`
    width: 80%;
    min-height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  `

  const TableRow = styled.tr`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 25%;
  `
  const Square = styled.td`
    border: 1px solid black;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 32px;
    font-size: 8px;
  `
  // v for vertical, h for horizontal
  return (
      <Board>
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
                onHover={{backgroundColor: "blue"}}
              >

              </Square>
            ))}
          </TableRow>
        ))}
      </Board>
  );
}
export default Gameboard
