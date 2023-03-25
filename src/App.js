import PlayerArea from "./components/PlayerArea";
import EnemyArea from "./components/EnemyArea";
import {ShipConstructor} from "./components/ShipConstructor"
import {Controller} from "./components/Controller"
import { useState } from "react";
import styled from "styled-components";

const AppSection = styled.main`
  width: 100%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media only screen and (min-width: 801px) and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
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
  const [playerBoard, setPlayerBoard] = useState(
    Array.from({ length: boardSize }, (_, v) =>
      Array.from({ length: boardSize }, (_, h) => ({
        v,
        h,
        hasShip: 0,
      }))
    )
  );
  const [computerBoard, setComputerBoard] = useState(
    Array.from({ length: boardSize }, (_, v) =>
      Array.from({ length: boardSize }, (_, h) => ({
        v,
        h,
        hasShip: 0,
      }))
    )
  );

  // functions to be accessed within PlayerArea and EnemyArea

  const [playerShipsPlaced, setPlayerShipsPlaced] = useState(false);
  const [comShipsPlaced, setComShipsPlaced] = useState(false);

  const updatePlayerShipsPlaced = (arePlayerShipsPlaced) => {
    setPlayerShipsPlaced(arePlayerShipsPlaced)
  }

  const updateComShipsPlaced = (areComShipsPlaced) => {
    setComShipsPlaced(areComShipsPlaced)
  }



  // end functions to be accessed within PlayerArea and EnemyArea


/* lifting state logic---------------------------------------------------------*/

// human side
const secondBoardSize = 10;
const [humanBoard, setHumanBoard] = useState(
  Array.from({ length: secondBoardSize }, (_, v) =>
    Array.from({ length: secondBoardSize }, (_, h) => ({
      v,
      h,
      hasShip: 0,
    }))
  )
);

const [playerShips, setPlayerShips] = useState([
  ShipConstructor("carrier"),
  ShipConstructor("battleship"),
  ShipConstructor("cruiser"),
  ShipConstructor("submarine"),
  ShipConstructor("destroyer"),
])

const [playerShipCoords, setPlayerShipCoords] = useState([])
// if shipCoord is hit, find what hasShip value is and take that string out of the playerSegmentsOnBoard array
const [playerSegmentsOnBoard, setPlayerSegmentsOnBoard] = useState([])
// if certain string does not exist in the playerSegmentsOnBoard, then that ship is sunk
// figure out what to push to the below playerShipsSunk array. Maybe just add 1 once?
const [playerShipsSunk, setPlayerShipsSunk] = useState(0)
// if playerShipsSunk.length === 5, the game is over

const secondPlaceShip = (ship, v,h, direction, board) => {
  const newBoard = [...board];
  const {length} = ship;
  const shipCoords = [];
  const segmentsOnBoard = [];

  const playerShipPlacementValid = (v,h) => {
    /* check for if ship goes out of bounds*/
    let hIncrement,vIncrement;
    if(direction === "h") {
      vIncrement = 0;
      hIncrement = 1;
    } else {
      vIncrement = 1;
      hIncrement = 0
    }
    let vEnding = v + (vIncrement * length);
    let hEnding = h + (hIncrement * length);
    for(let i = 0; i < length; i++) {
      if (
        vEnding > secondBoardSize ||
        hEnding > secondBoardSize ||
        vEnding < 0 ||
        hEnding < 0
      ) return "ship is out of bounds"
    /*end of check for if ship is out of bounds*/
    /* check for ship overlaps with already placed ship*/
      for(let i = 0; i < length; i++ ) {
        if(board[v + (vIncrement * i)][h + (hIncrement * i)].hasShip) return "ship overlaps with other ship"
      }

    }

  }
}


// end human side


const [comBoard, setComBoard] = useState(
  Array.from({ length: boardSize }, (_, v) =>
    Array.from({ length: boardSize }, (_, h) => ({
      v,
      h,
      hasShip: 0,
    }))
  )
);
  const [comShips, setComShips] = useState([
    ShipConstructor("carrier"),
    ShipConstructor("battleship"),
    ShipConstructor("cruiser"),
    ShipConstructor("submarine"),
    ShipConstructor("destroyer"),
  ])

/*end lifting state logic------------------------------------------------------*/




  return (
    <AppSection>
      <GameTitle data-testid="game-title">Battleship</GameTitle>
      <Boards>
        <BoardSection>
          <PlayerArea
            Player="Player"
            gameboard={playerBoard}
            playerShipsPlaced={playerShipsPlaced}
            updatePlayerShipsPlaced={updatePlayerShipsPlaced}
            boardSize={boardSize}
            // lifting state logic
            humanBoard={humanBoard}
            secondPlaceShip={secondPlaceShip}
            playerShips={playerShips}
            playerShipCoords={playerShipCoords}
            playerSegmentsOnBoard={playerSegmentsOnBoard}
            playerShipsSunk={playerShipsSunk}
            //end lifting state logic
          />
        </BoardSection>
        <BoardSection>
          <EnemyArea
            Player="Computer"
            gameboard={computerBoard}
            updateComShipsPlaced={updateComShipsPlaced}
          />
        </BoardSection>
      </Boards>
    </AppSection>
  );
};

function App() {
  return <AppMain />;
}

export default App;
