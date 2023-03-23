import PlayerArea from "./components/PlayerArea";
import EnemyArea from "./components/EnemyArea";
import {ShipConstructor} from "./components/ShipConstructor"
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
  const [gameBoard, setGameBoard] = useState(
    Array.from({ length: boardSize }, (_, v) =>
      Array.from({ length: boardSize }, (_, h) => ({
        v,
        h,
        hasShip: 0,
      }))
    )
  );

  return (
    <AppSection>
      <GameTitle data-testid="game-title">Battleship</GameTitle>
      <Boards>
        <BoardSection>
          <PlayerArea
            Player="Player"
            gameboard={gameBoard}
          />
        </BoardSection>
        <BoardSection>
          <EnemyArea
            Player="Computer"
            gameboard={gameBoard}
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
