import styled from "styled-components"
import {GameboardConstructor} from "./GameboardConstructor"
const Gameboard = () => {
  const {
    board
  } = GameboardConstructor()
  
  const Board = styled.table`
    border: 1px solid black;
    width: 50%;
    height: 50%;
  `
  const Square = styled.td`
    border: 1px solid black;
    width: 10%;
    height: 10%;
    background-color: ${(props) => props.backgroundColor};
  `
  return (
    <div>
      <Board>
        {
          board.map((col, colI) => (
            <tr key={colI}>
              {
                col.map((cell, cellI) => (
                  <Square key={cellI}
                    x={cell.x}
                    y={cell.y}
                    hasShip={cell.hasShip}
                    backgroundColor={cell.hasShip ? "red" : "white"}
                    style={{
                      backgroundColor: cell.hasShip ? "red" : "white"
                    }}
                  />
                ))
              }
            </tr>
          ))
        }
      </Board>
    </div>
  )
}
export default Gameboard
