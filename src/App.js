import PlayerArea from "./components/PlayerArea";
import EnemyArea from "./components/EnemyArea";
import {ShipConstructor} from "./components/ShipConstructor"
import { useState, useEffect, useRef } from "react";
import {AppSection, Boards, GameTitle, BoardSection, Winner, Turn} from "./components/StyledComponents"


const AppMain = () => {
  const currentTurn = useRef("player")

/* USESTATES-----------------------------------------------------------------*/

  const [boardSize, setBoardSize] = useState(10);
  const initialBoard = (boardSize) => {
    return Array.from({ length: boardSize }, (_, v) =>
      Array.from({ length: boardSize }, (_, h) => ({
        v,
        h,
        hasShip: 0,
      }))
    );
  };
  const [humanShips, setHumanShips] = useState([
    ShipConstructor("carrier"),
    ShipConstructor("battleship"),
    ShipConstructor("cruiser"),
    ShipConstructor("submarine"),
    ShipConstructor("destroyer"),
  ]);

  const [humanBoard, setHumanBoard] = useState(initialBoard(boardSize));

  const [humanDirection, setHumanDirection] = useState("h");
  const [allHumanShipsPlaced, setAllHumanShipsPlaced] = useState(false);

  const [humanShipCoords, setHumanShipCoords] = useState([]);
  // if shipCoord is hit, find what hasShip value is and take that string out of the playerSegmentsOnBoard array
  const [humanShipSegmentsOnBoard, setHumanShipSegmentsOnBoard] = useState([]);
  // if certain string does not exist in the playerSegmentsOnBoard, then that ship is sunk
  // figure out what to push to the below playerShipsSunk array. Maybe just add 1 once?
  const [humanShipsPlaced, setHumanShipsPlaced] = useState([])
  const [shipsToPlace, setShipsToPlace] = useState(humanShips);
  const [humanShip, setHumanShip] = useState(shipsToPlace[0]);

  // useStates for hit and miss logic
  const [hit, setHit] = useState(false);
  const [miss, setMiss] = useState(false);
  const [hitComCoords, setHitComCoords] = useState([]);
  const [missedComCoords, setMissedComCoords] = useState([]);

  const [hitPlayerCoords, setHitPlayerCoords] = useState([]);
  const [missedPlayerCoords, setMissedPlayerCoords] = useState([]);
  // end useStates for hit and miss logic

  // computer useStates
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
  // end computer useStates

  // useStates for both sides
  // const [turn, setTurn] = useState("player");
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");

  const [gameOn, setGameOn] = useState(false);
  // useStates for both sides

/* end USESTATES -----------------------------------------------------------*/

/* USEEFFECTS ----------------------------------------------------------------*/

  // useEffects for placing player ships
  useEffect(() => {
    setHumanShip(
      shipsToPlace.length > 0 ? shipsToPlace[0] : setAllHumanShipsPlaced(true)
    );
  }, [shipsToPlace])


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
  // end useEffects originally with placing player ships

  // useEffect for attacking computer ship

  useEffect(() => {}, [hitComCoords, missedComCoords]);
  useEffect(() => {}, [hitPlayerCoords, missedPlayerCoords]);

  // end useEffect for attacking computer ship

  // useEffect for both sides/gameon
  useEffect(() => {
    if (allHumanShipsPlaced && allComShipsPlaced) {
      setGameOn(true);
    }
  }, [allHumanShipsPlaced, allComShipsPlaced, humanShipSegmentsOnBoard]);

  useEffect(() => {
    // console.log("gameOn from app?", gameOn)
  }, [gameOn])

  useEffect(() => {
    // console.log("comShips", comShips);
  }, [comShips]);

  useEffect(() => {
    if (comShips.length === 0 || hitComCoords.length === 17) {
      setGameOn(false);
      setWinner("You");
      setLoser("Computer");
    }
  }, [gameOn, comShips, hitComCoords, winner, loser]);

  useEffect(() => {
    if (humanShips.length === 0 || hitPlayerCoords.length === 17) {
      setGameOn(false);
      setWinner("Computer");
      setLoser("You");
    }
  }, [gameOn, humanShips, hitPlayerCoords, winner, loser]);
  // end useEffect for both sides/gameon

/* end USEEFFECTS -------------------------------------------------------------*/

/* FUNCTIONS ------------------------------------------------------------------*/

  /* PLACE SHIP LOGIC */

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
          throw new Error("ship is out of bounds");
        }
      }
      /*end of check for if ship is out of bounds*/
      if(allHumanShipsPlaced) {
        throw new Error("all ships placed")
      }

      /* check for ship overlaps with already placed ship*/
      for (let i = 0; i < length; i++) {
        if (direction === "h") {
          if (newBoard[v][h + i].hasShip !== 0) {
            throw new Error("ship overlaps with another ship");
          }
        } else {
          if (newBoard[v + i][h].hasShip !== 0) {
            throw new Error("ship overlaps with another ship");
          }
        }
      }
      /* end check for ship overlap*/

      /* if both checks pass, return true*/
      return true;
    };

    if (shipPlacementValid(v, h)) {
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
      setHumanShipsPlaced([...humanShipsPlaced, ship.name])
      setShipsToPlace(
        shipsToPlace.filter((shipToPlace) => shipToPlace !== ship)
      )
      console.log("humanShipsPlaced", humanShipsPlaced)
      if (segmentsOnBoard.length === 17 && humanShipsPlaced.length === 5) {
        setAllHumanShipsPlaced(true);
      }
    }
    setHumanBoard(newBoard);
    return [newBoard, shipCoords, segmentsOnBoard];
  };

  const randomPlaceShips = (board, ships) => {
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
  };

  const handleRandomPlayerShipPlacement = () => {
    const [newBoard, newShipCoords, newShipSegmentsOnBoard] =
      randomPlaceShips(humanBoard, shipsToPlace);
    setHumanBoard(newBoard);
    setHumanShipCoords(newShipCoords);
    setHumanShipSegmentsOnBoard(newShipSegmentsOnBoard);
    // const allShipsPlaced = newShipSegmentsOnBoard.length === 17;
    setAllHumanShipsPlaced(true);
  };

  /*end Player PLACE SHIP LOGIC */

  /*attack logic*/

  // computer attack logic

  const getRandomCoords = (board) => {
    console.log("inside random coords")
    const v = Math.floor(Math.random() * board.length);
    const h = Math.floor(Math.random() * board.length);
    return [v, h];
  };

  const getSmartCoords = (lastHit, board, hitCoords) => {
    console.log("inside getSmartCoords A")
    const [v, h] = lastHit;

    const getAdjacentCoords = (v, h) => {
      const adjacentCoords = [
        [v - 1, h],
        [v + 1, h],
        [v, h - 1],
        [v, h + 1],
      ];
      console.log("adjacentCoords B", adjacentCoords)
      return adjacentCoords;
    };

    const getValidCoords = (coords, board) => {
      console.log("inside getValidCoords C")
      return coords.filter(
        ([v, h]) =>
          v >= 0 &&
          v < board.length &&
          h >= 0 &&
          h < board.length &&
          !board[v][h].hit &&
          !board[v][h].miss
      );
    }

    const direction =
      hitCoords.length >= 2 &&
      // check that absolute value of the vertical difference between the last two hits is 1
      ((hitCoords[hitCoords.length - 1][0] ===
        hitCoords[hitCoords.length - 2][0] &&
        Math.abs(
          hitCoords[hitCoords.length - 1][1] -
            hitCoords[hitCoords.length - 2][1]
        ) === 1) ||
        // check that absolute value of the horizontal difference between the last two hits is 1
        (hitCoords[hitCoords.length - 1][1] ===
          hitCoords[hitCoords.length - 2][1] &&
          Math.abs(
            hitCoords[hitCoords.length - 1][0] -
              hitCoords[hitCoords.length - 2][0]
          ) === 1))
        ? [
            // find vertical difference of last two hits
            hitCoords[hitCoords.length - 1][0] -
              hitCoords[hitCoords.length - 2][0],
            // find horizontal difference of last two hits
            hitCoords[hitCoords.length - 1][1] -
              hitCoords[hitCoords.length - 2][1],
          ]
        : null;
    console.log("direction D", direction)
    let validCoords;
    if (direction) {
      console.log("inside direction if E")
      const nextCoords = [v + direction[0], h + direction[1]];
      validCoords = getValidCoords([nextCoords], board);
      console.log("validCoords inside direction if E", validCoords)
      if(validCoords.length === 0) {
        console.log("inside validCoords.length === 0 if condition E2")
        // try opposite direction
        const oppositeCoords = [v - direction[0], h - direction[1]];
        validCoords = getValidCoords([oppositeCoords], board);
        console.log("validCoords inside validCoords.length === 0 ", validCoords)
      }
      console.log("validCoords inside direction if E2 with validCoords length", validCoords)
    } else {
      console.log("inside direction else F")
      const adjacentCoords = getAdjacentCoords(v, h);
      validCoords = getValidCoords(adjacentCoords, board);
      console.log("inside direction else F validCoords", validCoords)
    }
    if(validCoords.length === 0) {
      // if validCoords can't be found still, resort to random coords
      return getRandomCoords(board);
    }
    const randomIndex = Math.floor(Math.random() * validCoords.length);
    console.log("validCoords[randomIndex] G", validCoords[randomIndex])
    return validCoords[randomIndex];
  };

  const attackPlayer = (board, ships, hitCoords, forceHitCoords) => {
    if (!gameOn) return;
    if (currentTurn.current === "player") return;
    if (currentTurn.current !== "player") {
      let newBoard = [...board]
      let coords;
      if (hitCoords.length === 0) {
        if (forceHitCoords) {
          coords = forceHitCoords;
        } else {
          coords = getRandomCoords(board);
        }
      } else {
        coords = getSmartCoords(
          hitCoords[hitCoords.length - 1],
          newBoard,
          hitCoords
        );
      }
      const [v, h] = coords;
      const cell = board[v][h];

      if (cell.hasShip !== 0) {
        console.log("hit ship", cell.hasShip)
        const shipIndex = ships.findIndex(
          (ship) => ship.name.slice(0, 3) === cell.hasShip
        );
        const newShips = [...ships];
        newShips[shipIndex].isHit();
        setHumanShips(newShips);
        cell.hit = true;
        setHumanBoard(newBoard)
        setHitPlayerCoords([...hitPlayerCoords, [v,h]])
        console.log("inside cell.hasShip in attackPlayer hitPlayerCoords", hitPlayerCoords)
        if(newShips[shipIndex].isSunk()){
          const newShipsArray = [...ships]
          newShipsArray.splice(shipIndex, 1)
          setHumanShips(newShipsArray)
          console.log("humanShips in side sunk check in attackPlayer", humanShips)
        }
      } else {
        cell.miss = true;
        setHumanBoard(newBoard);
        setMissedPlayerCoords([...missedPlayerCoords, [v, h]]);
        console.log("missedPlayerCoords inside attackPlayer", missedPlayerCoords)
      }
    }
    currentTurn.current = "player";
  }


  //end computer attack logic

  //player attack logic

  setTimeout(() => {
    if (currentTurn.current === "Computer") {
      attackPlayer(humanBoard, humanShips, hitPlayerCoords, null);
    }
  },2000)

  const attackCom = (v, h, board, ships) => {
    if (!gameOn) return;
    if (currentTurn.current !== "player") return;
    if (currentTurn.current === "player") {
      const newBoard = [...board];
      const cell = newBoard[v][h];
      if (cell.hit || cell.miss) {
        return;
      }

      if (cell.hasShip !== 0) {
        const shipIndex = ships.findIndex(
          (ship) => ship.name.slice(0, 3) === cell.hasShip
        );
        const newShips = [...ships];
        newShips[shipIndex].isHit();
        setComShips(newShips);
        newBoard[v][h].hit = true;
        setComBoard(newBoard);
        setHitComCoords([...hitComCoords, [v, h]]);
        if (newShips[shipIndex].isSunk()) {
          alert(`sunk ${ships[shipIndex].name}`)
          const newArray = [...comShips];
          newArray.splice(shipIndex, 1);
          setComShips(newArray);
        }
      } else {
        setComBoard(newBoard);
        newBoard[v][h].miss = true;
        setMissedComCoords([...missedComCoords, [v, h]]);
      }
      // setTurn("Computer")
      currentTurn.current = "Computer";
    }
  };


  /*end attack logic */

/*END PLAYER SIDE FUNCTIONS  ----------------------------------------------------------------*/


/* COMPUTER SIDE FUNCTIONS ----------------------------------------------------------------------------------*/


  // computer place ships logic

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
          segmentsOnBoard.push(
            ...Array(ship.length).fill(ship.name.slice(0, 3))
            );
            validPlacement = true;
          }
        }
      }

    console.log("shipCoords for computer", shipCoords);
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
  };




  /* END COMPUTER SIDE FUNCTIONS-------------------------------------------------- */

/*FUNCTIONS end------------------------------------------------------------------*/

  return (
    <AppSection>
      <GameTitle data-testid="game-title">Battleship</GameTitle>
      {
        gameOn && (
          <Turn>{currentTurn.current}'s turn</Turn>
        )
      }
      <section>
        {winner !== "" && loser !== "" ? (
          <Winner winner={winner} loser={loser}>{`${winner} wins!`}</Winner>
        ) : null}
      </section>
      <Boards>
        <BoardSection>
          <PlayerArea
            Player="Player"
            humanBoard={humanBoard}
            humanDirection={humanDirection}
            humanPlaceShip={humanPlaceShip}
            /* for placing ships randomly */
            randomPlaceShips={randomPlaceShips}
            handleRandomPlayerShipPlacement={handleRandomPlayerShipPlacement}
            shipsToPlace={shipsToPlace}
            /*end of placing ships randomly */
            humanShips={humanShips}
            humanShipCoords={humanShipCoords}
            humanShipSegmentsOnBoard={humanShipSegmentsOnBoard}
            allHumanShipsPlaced={allHumanShipsPlaced}
            humanShip={humanShip}
            setHumanShip={setHumanShip}
            gameOn={gameOn}
            turn={currentTurn.current}
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
            attackCom={attackCom}
            hit={hit}
            setHit={setHit}
            miss={miss}
            setMiss={setMiss}
            turn={currentTurn.current}
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
