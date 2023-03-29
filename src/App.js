import PlayerArea from "./components/PlayerArea";
import EnemyArea from "./components/EnemyArea";
import {ShipConstructor} from "./components/ShipConstructor"
import { useState, useEffect } from "react";
import {AppSection, Boards, GameTitle, BoardSection} from "./components/StyledComponents"

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

/* lifting state logic---------------------------------------------------------*/

const [humanBoard, setHumanBoard] = useState(initialBoard(boardSize))
const [humanShips, setHumanShips] = useState(initialShips)

const [humanDirection , setHumanDirection] = useState("h")
const [humanShip, setHumanShip] = useState(humanShips[0])
const [allHumanShipsPlaced, setAllHumanShipsPlaced] = useState(false)

const [humanShipCoords, setHumanShipCoords] = useState([])
// if shipCoord is hit, find what hasShip value is and take that string out of the playerSegmentsOnBoard array
const [humanShipSegmentsOnBoard, setHumanShipSegmentsOnBoard] = useState([])
// if certain string does not exist in the playerSegmentsOnBoard, then that ship is sunk
// figure out what to push to the below playerShipsSunk array. Maybe just add 1 once?
const [humanShipsSunk, setHumanShipsSunk] = useState(0)
// if playerShipsSunk.length === 5, the game is over

/* player ship placement functionality ---------------------------------------*/
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

  if (shipPlacementValid(v,h)) {
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
const humanRandomPlaceShips = (board, ships) => {
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
          const vIndex = direction === "v" ? v + i : v;
          const hIndex = direction === "h" ? h + i : h;
          const shipSegment = ship.name.slice(0, 3);

          if (
            vIndex >= boardSize ||
            hIndex >= boardSize ||
            newBoard[vIndex][hIndex].hasShip !== 0 ||
            segmentsOnBoard.includes(shipSegment) ||
            allHumanShipsPlaced
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

          segmentsOnBoard.push(
            ...Array(ship.length).fill(ship.name.slice(0, 3))
          );
          validPlacement = true;
        }
      }
    }

    return [newBoard, shipCoords, segmentsOnBoard];
}

const handleRandomPlayerShipPlacement = () => {
  const [newBoard, newShipCoords, newShipSegmentsOnBoard] = humanRandomPlaceShips(
    humanBoard,
    humanShips
  );
  setHumanBoard(newBoard);
  setHumanShipCoords(newShipCoords);
  setHumanShipSegmentsOnBoard(newShipSegmentsOnBoard);
  const allShipsPlaced = newShipSegmentsOnBoard.length === 17;
  setAllHumanShipsPlaced(allShipsPlaced);
}
useEffect(() => {
  setHumanShip(
    humanShips.length !== 0 ? humanShips[0] : setAllHumanShipsPlaced(true)
  );
}, [humanShips, setAllHumanShipsPlaced]);

useEffect(() => {
  const handleKeyUp = (e) => {
    if (e.key === "h" && humanDirection !== "h") {
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

/*end player place ship functionality -----------------------------------------*/
// when gameOn is true
// clicking on the enemyCell should execute an attack function


const receiveAttack = (v,h,board, shipSegments, ships, setShips) => {
  let hit = false
  let miss = false
  if(board[v][h].hasShip !== 0) {
    hit = true;
    const deleteSegment = shipSegments.findIndex((shipPart) => shipPart === board[v][h].hasShip)
    shipSegments.splice(deleteSegment, 1)
    const ship = ships.find((ship) => ship.name.slice(0,3) === board[v][h].hasShip)
    console.log("ship", ship)
    if(ship.hp > 0) {
      ship.isHit()
      const newShipStats = ships.map((ship) => ({...ship, hp: ship.hp}))
      setShips(newShipStats)
    } else {
      ship.isSunk()
      const updatedShips = ships.map(ship => ({...ship, sunk: ship.sunk}));
      setShips(updatedShips)
    }
  } else {
    board[v][h].hasShip = "miss"
    console.log("board[v][h] miss?", board[v][h])
    miss = true
  }
  return [hit, miss]
}



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
        const vIndex = direction === "v" ? v + i : v;
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
}, [allComShipsPlaced])
// end computer side

/* both sides */
const [gameOn, setGameOn] = useState(false);
useEffect(() => {
  if (allHumanShipsPlaced && allComShipsPlaced) {
    setGameOn(true);
  }
},[allHumanShipsPlaced, allComShipsPlaced])
useEffect(() => {
}, [comShips, comShipSegmentsOnBoard]);
/* end both sides */

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
            /* for placing ships randomly */
            humanRandomPlaceShips={humanRandomPlaceShips}
            handleRandomPlayerShipPlacement={handleRandomPlayerShipPlacement}
            /*end of placing ships randomly */
            humanShips={humanShips}
            humanShipCoords={humanShipCoords}
            humanShipSegmentsOnBoard={humanShipSegmentsOnBoard}
            humanShipsSunk={humanShipsSunk}
            allHumanShipsPlaced={allHumanShipsPlaced}
            humanShip={humanShip}
            setHumanShip={setHumanShip}
            gameOn={gameOn}
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
            gameOn={gameOn}
            /*hit/attack */
            receiveAttack={receiveAttack}
            comShipSegmentsOnBoard={comShipSegmentsOnBoard}
            setComShips = {setComShips}
            /*end hit/attack */
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
