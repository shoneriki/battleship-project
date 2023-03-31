// // In PlayerBoard.js
// import classNames from "classnames"
// import { useState, useEffect } from "react";
// import { ShipConstructor } from "./ShipConstructor";

// import {
//   PlayerTitle,
//   Board,
//   BoardBody,
//   TableRow,
//   Square,
//   ComSquare,
//   ShipInfo,
//   Labels,
// } from "./StyledComponents";



// const ComputerBoard= ({
//   comBoard,
//   gameOn,
//   turn,
//   attackCom,
//   comShips,
// }) => {
//   const firstBoard = (boardSize) => {
//     return Array.from({ length: boardSize }, (_, v) =>
//       Array.from({ length: boardSize }, (_, h) => ({
//         v,
//         h,
//         hasShip: 0,
//       }))
//     );
//   };
//   const [boardSize, setBoardSize] = useState(10);
//   const [comBoard, setComBoard] = useState(firstBoard(boardSize));
//   const [comShips, setComShips] = useState([
//     ShipConstructor("Carrier"),
//     ShipConstructor("Battleship"),
//     ShipConstructor("Cruiser"),
//     ShipConstructor("Submarine"),
//     ShipConstructor("Destroyer"),
//   ])

// const [hit, setHit] = useState(false);
// const [miss, setMiss] = useState(false);
// const [hitComCoords, setHitComCoords] = useState([]);
// const [missedComCoords, setMissedComCoords] = useState([]);
// const attackCom = (v, h, board, ships) => {
//   if (!gameOn) return;
//   if (turn !== "player") return;
//   if (turn === "player") {
//     const newBoard = [...board];
//     const cell = newBoard[v][h];

//     if (cell.hasShip !== 0) {
//       const shipIndex = ships.findIndex(
//         (ship) => ship.name.slice(0, 3) === cell.hasShip
//       );
//       // alert(`hit ${ships[shipIndex].name}`)
//       const newShips = [...ships];
//       newShips[shipIndex].isHit();
//       setComShips(newShips);
//       newBoard[v][h].hit = true;
//       setComBoard(newBoard);
//       setHitComCoords([...hitComCoords, [v, h]]);
//       if (newShips[shipIndex].isSunk()) {
//         // alert(`sunk ${ships[shipIndex].name}`)
//         const newArray = [...comShips];
//         newArray.splice(shipIndex, 1);
//         setComShips(newArray);
//       }
//     } else {
//       setComBoard(newBoard);
//       newBoard[v][h].miss = true;
//       setMissedComCoords([...missedComCoords, [v, h]]);
//     }
//     // setTurn("Computer")
//   }
//   return [hit, miss];
// };



//   return (
//     <Board>
//       <BoardBody data-testid="thisBoard">
//         {comBoard.map((row, v) => (
//           <TableRow key={v}>
//             {row.map((cell, h) => (
//               <ComSquare
//                 key={`${v}, ${h}`}
//                 v={cell.v}
//                 h={cell.h}
//                 hasShip={cell.hasShip}
//                 onClick={
//                   gameOn ? () => attackCom(v, h, comBoard, comShips) : null
//                 }
//                 className={classNames({
//                   hit: cell.hit,
//                   miss: cell.miss,
//                   default: !cell.hit && !cell.miss,
//                 })}
//                 gameOn={gameOn}
//                 data-testid={`cell-${v}-${h}`}
//                 style={{
//                   cursor: gameOn && turn === "player" ? "pointer" : "default",
//                 }}
//               ></ComSquare>
//             ))}
//           </TableRow>
//         ))}
//       </BoardBody>
//     </Board>
//   );
// };
// export default ComputerBoard
