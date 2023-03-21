import styled from "styled-components"
import {GameboardConstructor} from "./GameboardConstructor"
const Gameboard = () => {
  const {
    board
  } = GameboardConstructor()

  const Board = styled.table`
    width: 50%;
    min-height: 100vh;
    padding: 0;
    margin: 0;
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
    padding: 8px;
    font-size: 8px;
  `

  return (
      <Board>
        {board.map((row, x) => (
          <TableRow key={x}>
            {row.map((cell, y) => (
              <Square
                key={`${x}, ${y}`}
                x={cell.x}
                y={cell.y}
                hasShip={cell.hasShip}
                data-testid={`cell-${x}-${y}`}
                backgroundColor={cell.hasShip ? "red" : "white"}
                style={{
                  backgroundColor: cell.hasShip ? "red" : "green",
                }}
              >
                {cell.x},{cell.y}
              </Square>
            ))}
          </TableRow>
        ))}
      </Board>
  );
}
export default Gameboard
