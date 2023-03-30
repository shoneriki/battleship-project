import PlayerArea from "./components/PlayerArea";
import EnemyArea from "./components/EnemyArea";
import {ShipConstructor} from "./components/ShipConstructor"
import { useState, useEffect } from "react";
import {AppSection, Boards, GameTitle, BoardSection, Winner, Turn} from "./components/StyledComponents"


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

/*attack logic +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const [hit, setHit] = useState(false);
const [miss, setMiss] = useState(false);
const [hitComCoords, setHitComCoords] = useState([]);
const [missedComCoords,setMissedComCoords] = useState([]);
const attackCom =(v,h,board,ships)  => {
  if(!gameOn) return;
  if (turn !== "player") return;
  if (turn === "player") {
    const newBoard = [...board];
    const cell = newBoard[v][h];

    if(cell.hasShip !== 0) {
      const shipIndex = ships.findIndex((ship) => ship.name.slice(0,3) === cell.hasShip)
      // alert(`hit ${ships[shipIndex].name}`)
      const newShips = [...ships]
      newShips[shipIndex].isHit()
      setComShips(newShips)
      newBoard[v][h].hit = true;
      setComBoard(newBoard)
      setHitComCoords([...hitComCoords, [v,h]])
      if(newShips[shipIndex].isSunk()) {
        // alert(`sunk ${ships[shipIndex].name}`)
        const newArray = [...comShips]
        newArray.splice(shipIndex,1)
        setComShips(newArray)
      }
    } else {
      setComBoard(newBoard);
      newBoard[v][h].miss = true;
      setMissedComCoords([...missedComCoords, [v,h]])
    }
    // setTurn("Computer")

  }
  return [hit,miss]
}

useEffect(() => {
},[hitComCoords, missedComCoords])
/*end attack logic */
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
        console.log("shipCoords for computer", shipCoords)
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

const attackPlayer = (board,ships) => {
  if(!gameOn) return;
  if(turn === "player") return;
  if(turn !== "player") {

  }
  const v = Math.floor(Math.random() * boardSize);
  const h = Math.floor(Math.random() * boardSize);

  const newBoard = [...board];
  const cell = newBoard[v][h];
  console.log("cell", cell);
  if(cell.hit || cell.miss) {
    return;
  }

  if(cell.hasShip !== 0) {
    console.log("hit a ship from computer?")
    const shipIndex = ships.findIndex((ship) => ship.name.slice(0,3) === cell.hasShip)
    const newShips = [...ships]
    newShips[shipIndex] = {...newShips[shipIndex], hp: newShips[shipIndex].hp -= 1}
    setHumanShips(newShips)
    setHumanBoard(newBoard)
    newBoard[v][h].hit = true
    setHitComCoords([...hitComCoords, [v,h]])
    console.log("hitComCoords", hitComCoords)
    if(newShips[shipIndex].hp <= 0) {
      const newArray = [...humanShips]
      newArray.splice(shipIndex,1)
      setHumanShips(newArray)
    }
  } else {
    console.log("miss from computer?")
    newBoard[v][h].miss = true;
    setHumanBoard(newBoard);
    setMissedComCoords([...missedComCoords, [v,h]])
  }
  // setTurn("player")
  return [hit,miss]
}
// end computer side

/* both sides */

const [turn, setTurn] = useState("player");
const [winner, setWinner] = useState("")
const [loser, setLoser] = useState("")

const [gameOn, setGameOn] = useState(false);
useEffect(() => {
  if (allHumanShipsPlaced && allComShipsPlaced) {
    setGameOn(true);
  }
},[allHumanShipsPlaced, allComShipsPlaced])

useEffect(()=>{
  console.log("comShips", comShips)
},[comShips])

useEffect(() => {
  if (comShips.length === 0 || hitComCoords.length === 17) {
    setGameOn(false);
    setWinner("Player");
    setLoser("Computer");
  }
}, [gameOn, comShips, hitComCoords, winner, loser])

/* end both sides */

  return (
    <AppSection>
      <GameTitle data-testid="game-title">Battleship</GameTitle>
      <section>
      {
        winner !== "" && loser !== "" ? <Winner winner={winner} loser={loser}>{`${winner} wins!`}</Winner> : null
      }
      </section>
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
            allHumanShipsPlaced={allHumanShipsPlaced}
            humanShip={humanShip}
            setHumanShip={setHumanShip}
            gameOn={gameOn}
            turn={turn}
          />
        </BoardSection>
        <BoardSection>
          <EnemyArea
            Player="Computer"
            comBoard={comBoard}
            boardSize={boardSize}
            comShips={comShips}
            setComShips={setComShips}
            comPlaceAllShips={comPlaceAllShips}
            handlePlaceComputerShips={handlePlaceComputerShips}
            allComShipsPlaced={allComShipsPlaced}
            gameOn={gameOn}
            // attack logic
            attackCom = {attackCom}
            hit={hit}
            setHit={setHit}
            miss={miss}
            setMiss={setMiss}
            turn={turn}
            // end attack logic
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
