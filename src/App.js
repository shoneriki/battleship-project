import Gameboard from "./components/Gameboard"

function App() {
  return (
    <div className="app">
      <h1 className="title">Battleship</h1>
      <div className="boards">
        <div className="board">
          <h2>Player</h2>
          <Gameboard/>
        </div>
        <div className="board">
          <h2>Computer Board</h2>
          <Gameboard/>
        </div>
      </div>
    </div>

  );
}

export default App;
