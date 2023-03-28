import PlayerArea from "./components/PlayerArea";
import EnemyArea from "./components/EnemyArea";
import {ShipConstructor} from "./components/ShipConstructor"
import { useState, useEffect } from "react";
import styled from "styled-components";

const AppSection = styled.main`
  width: 100%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 800px),
    only screen and (min-width: 801px) and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Boards = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  @media only screen and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 30vh;
  }
`;
const GameTitle = styled.h1`
  text-align: center;
`;

const BoardSection = styled.section`
  width: 50%;
  height: 100%;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const AppMain = () => {
  const [boardSize, setBoardSize] = useState(10)
  const initialBoard = (boardSize) => {
    return Array.from({length: boardSize}, (_,v) =>
      Array.from({length: boardSize}, (_,h) => ({
        v,
        h,
        hasShip: 0,
      }))
    )
  }
  const initialShips = [
      ShipConstructor("carrier"),
      ShipConstructor("battleship"),
      ShipConstructor("cruiser"),
      ShipConstructor("submarine"),
      ShipConstructor("destroyer"),
  ]
  const [allShipsPlaced, setAllShipsPlaced] = useState(false)

/* lifting state logic---------------------------------------------------------*/

const [humanBoard, setHumanBoard] = useState(initialBoard(boardSize))
const [humanShips, setHumanShips] = useState(initialShips)

const [placementError, setPlacementError] = useState(null);

const [humanDirection , setHumanDirection] = useState("h")
const [humanShip,setHumanShip ] = useState(humanShips[0])
const [allHumanShipsPlaced, setAllHumanShipsPlaced] = useState(false)

const [humanShipCoords, setHumanShipCoords] = useState([])
// if shipCoord is hit, find what hasShip value is and take that string out of the playerSegmentsOnBoard array
const [humanShipSegmentsOnBoard, setHumanShipSegmentsOnBoard] = useState([])
// if certain string does not exist in the playerSegmentsOnBoard, then that ship is sunk
// figure out what to push to the below playerShipsSunk array. Maybe just add 1 once?
const [humanShipsSunk, setHumanShipsSunk] = useState(0)
// if playerShipsSunk.length === 5, the game is over

const humanPlaceShip = (ship, v, h, direction, board) => {
  const newBoard = [...board];
  const { length } = ship;
  const shipCoords = [...humanShipCoords];
  const segmentsOnBoard = [...humanShipSegmentsOnBoard];

  const shipPlacementValid = (v, h) => {
    /* check for if ship goes out of bounds*/
    let hIncrement, vIncrement;
    if (direction === "h") {
      vIncrement = 0;
      hIncrement = 1;
    } else {
      vIncrement = 1;
      hIncrement = 0;
    }
    let vEnding = v + vIncrement * length;
    let hEnding = h + hIncrement * length;
    for (let i = 0; i < length; i++) {
      if (
        vEnding > boardSize ||
        hEnding > boardSize ||
        vEnding < 0 ||
        hEnding < 0
      ) {
        throw new Error( "ship is out of bounds")
      }
    }
    /*end of check for if ship is out of bounds*/

    /* check for ship overlaps with already placed ship*/
    for (let i = 0; i < length; i++) {
      if (direction === "h") {
        if (newBoard[v][h + i].hasShip !== 0) {
          throw new Error("ship overlaps with another ship")
        }
      } else {
        if (newBoard[v + i][h].hasShip !== 0) {
          throw new Error( "ship overlaps with another ship")
        }
      }
    }
    /* end check for ship overlap*/

    /* if both checks pass, return true*/
    return true;
  };

  const placementResult = shipPlacementValid(v, h);
  if (placementResult === true) {
    for (let i = 0; i < length; i++) {
      if (direction === "h") {
        newBoard[v][h + i].hasShip = ship.name.slice(0, 3);
        shipCoords.push([v, h + i]);
      } else {
        newBoard[v + i][h].hasShip = ship.name.slice(0, 3);
        shipCoords.push([v + i, h]);
      }
      segmentsOnBoard.push(ship.name.slice(0, 3));
    }
    setHumanShipCoords(shipCoords);
    setHumanShipSegmentsOnBoard(segmentsOnBoard);
    const newShipsToBePlaced = humanShips.filter(
      (item) => item.name !== ship.name
    );
    setHumanShips(newShipsToBePlaced);
  }
  setHumanBoard(newBoard);
};


// const humanRandomPlaceShips = (board, ships) => {
//   const newBoard = [...board];
//   const shipCoords = [];
//   const segmentsOnBoard = [];

//   for (const ship of ships) {
//     let validPlacement = false;
//     while (!validPlacement) {
//       const v = Math.floor(Math.random() * (boardSize - ship.length + 1));
//       const h = Math.floor(Math.random() * (boardSize - ship.length + 1));
//       const direction = Math.random() > 0.5 ? "h" : "v";

//       validPlacement = true;
//       for (let i = 0; i < ship.length; i++) {
//         const vIndex = direction === "h" ? v : v + i;
//         const hIndex = direction === "h" ? h + i : h;
//         if (
//           vIndex >= boardSize ||
//           hIndex >= boardSize ||
//           newBoard[vIndex][hIndex].hasShip !== 0
//         ) {
//           validPlacement = false;
//           break;
//         }
//       }

//       if (validPlacement) {
//         for (let i = 0; i < ship.length; i++) {
//           const vIndex = direction === "h" ? v : v + i;
//           const hIndex = direction === "h" ? h + i : h;
//           newBoard[vIndex][hIndex].hasShip = ship.name.slice(0, 3);
//           shipCoords.push([vIndex, hIndex]);
//         }
//         segmentsOnBoard.push(...Array(ship.length).fill(ship.name.slice(0, 3)));
//       }
//     }
//   }

//   return [newBoard, shipCoords, segmentsOnBoard];
// };

// const handleRandomPlacement = () => {
//   const [newBoard, shipCoords, segmentsOnBoard] = humanRandomPlaceShips(
//     humanBoard,
//     humanShips
//   );
//   setHumanBoard(newBoard);
//   setHumanShipCoords(shipCoords);
//   setHumanShipSegmentsOnBoard(segmentsOnBoard);
//   setAllHumanShipsPlaced(true);
// };

// useEffect(() => {
//   if (allHumanShipsPlaced) {
//     // do something else, like start the game
//   }
// }, [allHumanShipsPlaced]);



useEffect(() => {
  const handleKeyUp = (e) => {
    if (e.key === "h" && humanDirection !== "h") {
      console.log("horizontal?")
      setHumanDirection("h");
    } else if (e.key === "v" && humanDirection !== "v") {
      setHumanDirection("v");
    }
  };
  window.addEventListener("keyup", handleKeyUp);
  return () => {
    window.removeEventListener("keyup", handleKeyUp);
  };
}, [humanDirection]);

useEffect(() => {
  setHumanShip(
    humanShips.length !== 0 ? humanShips[0] : setAllHumanShipsPlaced(true)
  );
}, [humanShips, setAllHumanShipsPlaced]);



// end human side


// computer side
const [comBoard, setComBoard] = useState(initialBoard(boardSize));
const [comShips, setComShips] = useState([
  ShipConstructor("carrier"),
  ShipConstructor("battleship"),
  ShipConstructor("cruiser"),
  ShipConstructor("submarine"),
  ShipConstructor("destroyer"),
]);

const [comShipCoords, setComShipCoords] = useState([]);
const [comShipSegmentsOnBoard, setComShipSegmentsOnBoard] = useState([]);
const [allComShipsPlaced, setAllComShipsPlaced] = useState(false);

const comPlaceAllShips = (board, ships) => {
  const newBoard = [...board];
  const shipCoords = [];
  const segmentsOnBoard = [];

  for (const ship of ships) {
    let validPlacement = false;
    while (!validPlacement) {
      const v = Math.floor(Math.random() * (boardSize - ship.length + 1));
      const h = Math.floor(Math.random() * (boardSize - ship.length + 1));
      const direction = Math.random() > 0.5 ? "h" : "v";

      let validSegments = true;
      for (let i = 0; i < ship.length; i++) {
        const vIndex = direction === "h" ? v : v + i;
        const hIndex = direction === "h" ? h + i : h;
        const shipSegment = ship.name.slice(0, 3);

        if (
          vIndex >= boardSize ||
          hIndex >= boardSize ||
          newBoard[vIndex][hIndex].hasShip !== 0 ||
          segmentsOnBoard.includes(shipSegment) ||
          allComShipsPlaced
        ) {
          validSegments = false;
          break;
        }
      }

      if (validSegments) {
        for (let i = 0; i < ship.length; i++) {
          const vIndex = direction === "h" ? v : v + i;
          const hIndex = direction === "h" ? h + i : h;
          const shipSegment = ship.name.slice(0, 3);

          newBoard[vIndex][hIndex].hasShip = shipSegment;
          shipCoords.push([vIndex, hIndex]);
        }

        segmentsOnBoard.push(...Array(ship.length).fill(ship.name.slice(0, 3)));
        validPlacement = true;
      }
    }
  }

  return [newBoard, shipCoords, segmentsOnBoard];
};

const handlePlaceComputerShips = () => {
  const [newComBoard, newComShipCoords, newComShipSegmentsOnBoard] =
    comPlaceAllShips(comBoard, comShips);
  setComBoard(newComBoard);
  setComShipCoords(newComShipCoords);
  setComShipSegmentsOnBoard(newComShipSegmentsOnBoard);
  const allShipsPlaced = newComShipSegmentsOnBoard.length === 17;
  setAllComShipsPlaced(allShipsPlaced);
}


useEffect(() => {
  if (allComShipsPlaced) {
    console.log("all computer ships placed")
  }
}, [allComShipsPlaced])
// end computer side

/*end lifting state logic------------------------------------------------------*/




  return (
    <AppSection>
      <GameTitle data-testid="game-title">Battleship</GameTitle>
      <Boards>
        <BoardSection>
          <PlayerArea
            Player="Player"
            humanBoard={humanBoard}
            humanDirection={humanDirection}
            humanPlaceShip={humanPlaceShip}
            // humanRandomPlaceShips={humanRandomPlaceShips}
            // handleRandomPlacement={handleRandomPlacement}
            placementError={placementError}
            humanShips={humanShips}
            humanShipCoords={humanShipCoords}
            humanShipSegmentsOnBoard={humanShipSegmentsOnBoard}
            humanShipsSunk={humanShipsSunk}
            allHumanShipsPlaced={allHumanShipsPlaced}
            humanShip={humanShip}
            setHumanShip={setHumanShip}
          />
        </BoardSection>
        <BoardSection>
          <EnemyArea
            Player="Computer"
            comBoard={comBoard}
            boardSize={boardSize}
            comShips={comShips}
            comPlaceAllShips={comPlaceAllShips}
            handlePlaceComputerShips={handlePlaceComputerShips}
            allComShipsPlaced={allComShipsPlaced}
          />
        </BoardSection>
      </Boards>
    </AppSection>
  );
};

function App() {
  return <AppMain />;
}

export default App
