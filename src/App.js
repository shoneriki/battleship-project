import PlayerArea from "./components/PlayerArea";
import EnemyArea from "./components/EnemyArea";
import {ShipConstructor} from "./components/ShipConstructor"
import { useState, useEffect, useRef } from "react";
import {AppSection, Boards, GameTitle, BoardSection, Winner, Turn} from "./components/StyledComponents"

import {useToast} from "./components/useToast"
import Toast from "./components/Toast"


const AppMain = () => {
  const currentTurn = useRef("Player")

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
  const [humanShipSegmentsOnBoard, setHumanShipSegmentsOnBoard] = useState([]);
  const [humanShipsPlaced, setHumanShipsPlaced] = useState([])
  const [shipsToPlace, setShipsToPlace] = useState(humanShips);
  const [humanShip, setHumanShip] = useState(shipsToPlace[0]);

  // useStates for hit and miss logic
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
  const [computerAttacking, setComputerAttacking] = useState(false)
  // end computer useStates

  // useStates for both sides
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");

  const [gameOn, setGameOn] = useState(false);

  const [turn, setTurn] = useState("Player")

  const {toasts, showToast, removeToast} = useToast()
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
      showToast("Game Started. Your Turn", 1000, "success")
    }
  }, [ gameOn, allHumanShipsPlaced, allComShipsPlaced, humanShipSegmentsOnBoard]);

  useEffect(() => {
    handlePlaceComputerShips()
  },[])

  useEffect(() => {
    // console.log("comShips", comShips);
  }, [comShips]);

  useEffect(() => {
    if (currentTurn.current === "Computer") {
      setTimeout(() => {
        attackPlayer(humanBoard, humanShips, hitPlayerCoords, null);
      }, 2000);
    }
  }, [
    currentTurn.current,
    humanBoard,
    humanShips,
    hitPlayerCoords,
    computerAttacking,
  ]);

  useEffect(() => {
    if (comShips.length === 0 || hitComCoords.length === 17) {
      setGameOn(false);
      setWinner("Player");
      setLoser("Computer");
      showToast("You Win!", 1000, "win")
    }
  }, [gameOn, comShips, hitComCoords, winner, loser]);

  useEffect(() => {
    if (humanShips.length === 0 || hitPlayerCoords.length === 17) {
      setGameOn(false);
      setWinner("Computer");
      setLoser("Player");
      showToast("Computer Wins!", 1000, "lose")
    }
  }, [gameOn, humanShips, hitPlayerCoords, winner, loser]);


  // end useEffect for both sides/gameon

/* end USEEFFECTS -------------------------------------------------------------*/

/* FUNCTIONS ------------------------------------------------------------------*/

  /* PLACE SHIP LOGIC */

  const humanPlaceShip = (ship, v, h, direction, board) => {
    const newBoard = board.map((v) => v.map((cell) => ({ ...cell })));
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
      /* end of check for if ship is out of bounds*/
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
      if (segmentsOnBoard.length === 17 && humanShipsPlaced.length === 5) {
        setAllHumanShipsPlaced(true);
      }
    }
    setHumanBoard(newBoard);
    return [newBoard, shipCoords, segmentsOnBoard];
  };

  const randomPlaceShips = (board, ships) => {
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
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
    const v = Math.floor(Math.random() * board.length);
    const h = Math.floor(Math.random() * board.length);
    return [v, h];
  };

  const getSmartCoords = (lastHit, board, hitCoords) => {
    const [v, h] = lastHit;

    const getAdjacentCoords = (v, h) => {
      const adjacentCoords = [
        [v - 1, h],
        [v + 1, h],
        [v, h - 1],
        [v, h + 1],
      ];
      return adjacentCoords;
    };

    const getValidCoords = (coords, board) => {
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
    let validCoords;
    if (direction) {
      const nextCoords = [v + direction[0], h + direction[1]];
      validCoords = getValidCoords([nextCoords], board);
      if(validCoords.length === 0) {
        // try opposite direction
        const oppositeCoords = [v - direction[0], h - direction[1]];
        validCoords = getValidCoords([oppositeCoords], board);
      }
    } else {
      const adjacentCoords = getAdjacentCoords(v, h);
      validCoords = getValidCoords(adjacentCoords, board);
    }
    if(validCoords.length === 0) {
      // if validCoords can't be found still, resort to random coords
      return getRandomCoords(board);
    }
    const randomIndex = Math.floor(Math.random() * validCoords.length);
    return validCoords[randomIndex];
  };

  const attackPlayer = (board, ships, hitCoords, forceHitCoords) => {
    if (!gameOn) return;
    if (currentTurn.current === "Player") return;
    if (currentTurn.current !== "Player") {
      setComputerAttacking(true);
      let newBoard = board.map(row => row.map(cell => ({...cell})))
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
      const cell = newBoard[v][h];
      if (cell.hit || cell.miss) {
        // Call attackPlayer again to get new coordinates and try again
        return attackPlayer(board, ships, hitCoords, forceHitCoords);
      }

      if (cell.hasShip !== 0) {
        const shipIndex = ships.findIndex(
          (ship) => ship.name.slice(0, 3) === cell.hasShip
        );
        if(shipIndex  !== -1)  {
        const newShips = ships.map(ship => ship.copy());
        newShips[shipIndex].isHit();
        setHumanShips(newShips);
        cell.hit = true;
        setHumanBoard(newBoard)
        setHitPlayerCoords([...hitPlayerCoords, [v,h]])
        if(newShips[shipIndex].isSunk()){
          showToast(
            `The Computer Sank Your ${
              ships[shipIndex].name.charAt(0).toUpperCase() +
              ships[shipIndex].name.slice(1)
            }`, 1000, "warning"
          );
          const newShipsArray = ships.map((ship) => ship.copy());
          newShipsArray.splice(shipIndex, 1);
          setHumanShips(newShipsArray);
        }
      }
      } else {
        cell.miss = true;
        setHumanBoard(newBoard);
        setMissedPlayerCoords([...missedPlayerCoords, [v, h]]);
      }
    }
    currentTurn.current = "Player";

    if(gameOn) {
      showToast("Your Turn", 1000, "success");
    }
    setComputerAttacking(false);
  }


  //end computer attack logic

  //player attack logic

  const attackCom = (v, h, board, ships) => {
    if (!gameOn) return;
    if (currentTurn.current !== "Player") return;
    if (currentTurn.current === "Player") {
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
          showToast(`You Sunk Their ${ships[shipIndex].name.charAt(0).toUpperCase() + ships[shipIndex].name.slice(1)}`, 1000, "success")
          const newArray = [...comShips];
          newArray.splice(shipIndex, 1);
          setComShips(newArray);
        }
      } else {
        setComBoard(newBoard);
        newBoard[v][h].miss = true;
        setMissedComCoords([...missedComCoords, [v, h]]);
      }
      currentTurn.current = "Computer";
    }
  };


  /*end attack logic */

/*END PLAYER SIDE FUNCTIONS  ----------------------------------------------------------------*/


/* COMPUTER SIDE FUNCTIONS ----------------------------------------------------------------------------------*/


  // computer place ships logic

  const comPlaceAllShips = (board, ships) => {
    const newBoard = board.map(v => v.map(cell => ({...cell})));
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

    // console.log("shipCoords for computer", shipCoords);
    showToast("Computer Ships Placed! Please place your ships on your board", 1500, "success");
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

  //end computer place ships logic

  // toast functions


  // end toast functions


  /* END COMPUTER SIDE FUNCTIONS-------------------------------------------------- */

/*FUNCTIONS end------------------------------------------------------------------*/
  return (
    <AppSection>
      <GameTitle data-testid="game-title">Battleship</GameTitle>
      {
        toasts.map((toast) => {
          return (
            <Toast
              key={toast.id}
              message={toast.message}
              duration={toast.duration}
              onRemove={() => removeToast(toast.id)}
              type={toast.type}
            />
          )
        })
      }
      {/* {gameOn && <Turn>{currentTurn.current}'s Turn</Turn>} */}
      <section>
        {winner !== "" && loser !== "" ? (
          <Winner winner={winner} loser={loser}>{`${winner} Wins!`}</Winner>
        ) : null}
      </section>
      <Boards>
        <BoardSection>
          <PlayerArea
            Player="Player"
            humanBoard={humanBoard}
            humanDirection={humanDirection}
            setHumanDirection={setHumanDirection}
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
            comShips={comShips}
            allComShipsPlaced={allComShipsPlaced}
            gameOn={gameOn}
            winner={winner}
            // attack logic
            attackCom={attackCom}
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
