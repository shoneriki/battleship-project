import {useState, useEffect} from "react";
import {ShipConstructor} from "../components/ShipConstructor"

export function useBattleshipGame() {
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
  const [humanShips, setHumanShips]= useState([
    ShipConstructor("carrier"),
    ShipConstructor("battleship"),
    ShipConstructor("cruiser"),
    ShipConstructor("submarine"),
    ShipConstructor("destroyer"),
  ]);
  const [comShips, setComShips] = useState([
    ShipConstructor("carrier"),
    ShipConstructor("battleship"),
    ShipConstructor("cruiser"),
    ShipConstructor("submarine"),
    ShipConstructor("destroyer"),
  ]);

  return {
    initialBoard,
    boardSize,
    setBoardSize,
    humanShips,
    setHumanShips,
    comShips,
    setComShips,
  }
}
