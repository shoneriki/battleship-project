import {useState, useEffect} from "react"
import styled from "styled-components"
import {GameboardConstructor} from "./GameboardConstructor"
import {ShipConstructor} from "./ShipConstructor"
import {PlayerTitle, Board, BoardBody, TableRow, Square, ShipInfo} from "./StyledComponents"

const PlayerArea = ({
  Player,
  gameboard,
  updatePlayerShipsPlaced,
  boardSize,
  /*  lifting state logic props---------------------------------------------*/
  humanBoard,
  humanPlaceShip,
  humanShips,
  humanShipCoords,
  humanSegmentsOnBoard,
  humanShipsSunk,
  humanDirection,
  allHumanShipsPlaced,
  humanShip,
  setHumanShip,
  /* end lifting state logic props -----------------------------------------*/
}) => {

  // const [playerBoard, setPlayerBoard] = useState(gameboard);
  // const [direction, setDirection] = useState("h");
  // const [shipsToBePlaced, setShipsToBePlaced] = useState([
  //   ShipConstructor("carrier"),
  //   ShipConstructor("battleship"),
  //   ShipConstructor("cruiser"),
  //   ShipConstructor("submarine"),
  //   ShipConstructor("destroyer"),
  // ]);
  // const [ship, setShip] = useState(
  //   shipsToBePlaced !== 0 ? shipsToBePlaced[0] : null
  // );

  // const [allShipsPlaced, setAllShipsPlaced] = useState(false);
  // const [shipCoords, setShipCoords] = useState([]);
  // const [placedShips, setPlacedShips] = useState([]);

  // useEffect(() => {
  //   const handleKeyUp = (e) => {
  //     if (e.key === "h" && direction !== "h") {
  //       setDirection("h");
  //     } else if (e.key === "v" && direction !== "v") {
  //       setDirection("v");
  //     }
  //   };
  //   window.addEventListener("keyup", handleKeyUp);
  //   return () => {
  //     window.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, [direction]);

  // useEffect(() => {
  //   setShip(
  //     shipsToBePlaced.length !== 0
  //     ? shipsToBePlaced[0]
  //     : setAllShipsPlaced(true)
  //     );
  //   }, [shipsToBePlaced, allShipsPlaced]);

  // const placeShip = (ship, v, h, direction, board) => {
  //   const newBoard = playerBoard.map((row) => [...row]);
  //   const { length } = ship;
  //   const placementValid = (v, h) => {
  //     /* checking if ship goes out of bounds */
  //     let hIncrement, vIncrement;
  //   if (direction === "h") {
  //     vIncrement = 0;
  //     hIncrement = 1;
  //   } else {
  //     vIncrement = 1;
  //     hIncrement = 0;
  //   }
  //   // calculating the ending coordinates of the ship
  //   const hEnding = h + ship.length * hIncrement;
  //   const vEnding = v + ship.length * vIncrement;
  //     if (vEnding > boardSize || hEnding > boardSize || v < 0 || h < 0) {
  //       throw new Error("Ship is out of bounds");
  //     }
  //   /* end check of ship out of bounds */

  //     /* check if ship is overlapping another ship */
  //     for (let i = 0; i < length; i++) {
  //       if (direction === "h") {
  //         if (newBoard[v][h+i].hasShip) throw new Error("at least part of ship is overlapping another ship")
  //       } else {
  //         if (newBoard[v+i][h].hasShip) throw new Error("at least part of ship is overlapping another ship")
  //       }

  //       /* end of check if ship is overlapping with another ship*/

  //       return true;
  //     }
  //   };

  //   if (placementValid(v, h)) {
  //     for (let i = 0; i < length; i++) {
  //       if (direction === "h") {
  //         shipCoords.push([v, h + i]);
  //         newBoard[v][h + i].hasShip = ship.name.slice(0, 3);
  //       } else {
  //         shipCoords.push([v + i, h]);
  //         newBoard[v + i][h].hasShip = ship.name.slice(0, 3);
  //       }
  //       placedShips.push(ship.name.slice(0, 3));
  //     }
  //     setPlayerBoard(newBoard);
  //     const newShipsToBePlaced = shipsToBePlaced.filter(
  //       (item) => item.name !== ship.name
  //     );
  //     setShipsToBePlaced(newShipsToBePlaced);
  //   }
  //   return { board, shipsToBePlaced, shipCoords };
  // };

  // // functions to access from app

  // /* check if all ships are placed  */

  // if(allShipsPlaced) {
  //   updatePlayerShipsPlaced(true)
  // }

  // // end functions to access from app

  // const Info = ({ Player, direction }) => {
  //   return (
  //     <>
  //       <PlayerTitle>{Player}</PlayerTitle>
  //       {Player !== "Computer" && !allShipsPlaced && (
  //         <ShipInfo data-testid={`${Player}-ship-info`}>
  //           <section className="ShipSelector">
  //             <h6> h for horizontal, v for vertical</h6>
  //             <h6>
  //               {ship.name}, {direction === "h" ? "horizontal" : "vertical"},{" "}
  //               {ship.length}
  //             </h6>
  //             {shipsToBePlaced.map((ship) => {
  //               return (
  //                 <button key={ship.name} onClick={(e) => setShip(ship)}>
  //                   {ship.name}
  //                 </button>
  //               );
  //             })}
  //           </section>
  //         </ShipInfo>
  //       )}
  //     </>
  //   );
  // };

  // const PlayerBoard = ({ Player }) => {
  //   return (
  //     <Board>
  //       <BoardBody data-testid={`${Player}-board`}>
  //         {playerBoard.map((row, v) => (
  //           <TableRow key={v}>
  //             {row.map((cell, h) => (
  //               <Square
  //                 key={`${v}, ${h}`}
  //                 v={cell.v}
  //                 h={cell.h}
  //                 hasShip={cell.hasShip}
  //                 data-testid={`${Player}-cell-${v}-${h}`}
  //                 style={{
  //                   backgroundColor: cell.hasShip ? "green" : "blue",
  //                 }}
  //                 onClick={() => {
  //                   if (!allShipsPlaced) {
  //                     try {
  //                       placeShip(ship, v, h, direction, playerBoard);
  //                     } catch (error) {
  //                       alert(error.message);
  //                     }
  //                   } else {
  //                     alert("All ships have been placed");
  //                   }
  //                 }}
  //               ></Square>
  //             ))}
  //           </TableRow>
  //         ))}
  //       </BoardBody>
  //     </Board>
  //   );
  // };
/* lifting state logic -----------------------------------------------------*/
  const SecondInfo = ({ Player, direction }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        {Player !== "Computer" && !allHumanShipsPlaced && (
          <ShipInfo data-testid={`${Player}-ship-info`}>
            <section className="ShipSelector">
              <h6> h for horizontal, v for vertical</h6>
              <h6>
                {humanShip.name}, {direction === "h" ? "horizontal" : "vertical"},{" "}
                {humanShip.length}
              </h6>
              {humanShips.map((ship) => {
                return (
                  <button key={ship.name} onClick={(e) => setHumanShip(ship)}>
                    {ship.name}
                  </button>
                );
              })}
            </section>
          </ShipInfo>
        )}
      </>
    );
  };

  const SecondPlayerBoard = ({ Player }) => {
    return (
      <Board>
        <BoardBody data-testid={`${Player}-board`}>
          {humanBoard.map((row, v) => (
            <TableRow key={v}>
              {row.map((cell, h) => (
                <Square
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  style={{
                    backgroundColor: cell.hasShip ? "green" : "blue",
                  }}
                  onClick={() => {
                    if (!allHumanShipsPlaced) {
                      try {
                        humanPlaceShip(humanShip, v, h, humanDirection, humanBoard);
                      } catch (error) {
                        alert(error.message);
                      }
                    } else {
                      alert("All ships have been placed");
                    }
                  }}
                ></Square>
              ))}
            </TableRow>
          ))}
        </BoardBody>
      </Board>
    );
  };

  /* end lifting state logic---------------------------------------------------*/


  // v for vertical, h for horizontal
  return (
    <section>
      {/* <Info Player={Player} direction={direction} />
      <PlayerBoard Player={Player}/> */}
      {/* // lifting state logic */}
      <SecondInfo
        Player={Player}
      />
      <SecondPlayerBoard
        Player={Player}
      />
      {/* // end lifting state logic */}
    </section>
  );
};

export default PlayerArea;
