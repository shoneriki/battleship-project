import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';


/* styles for appMain---------------------------------------------------------*/

export const AppSection = styled.main`
  background-color: #eaf2f8;
  color: #2c3e50;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
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

export const Boards = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 30vh;
  }
`;

export const GameTitle = styled.h1`
  text-align: center;
`;

export const BoardSection = styled.section`
  width: 50%;
  height: 100%;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

/* end styles for appMain-----------------------------------------------------*/

export const PlayerTitle = styled.h1`
  text-align: center;
`;

/*  board ---------------------------------------------------------------------*/

export const Board = styled.table`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4% 0;
  @media only screen and (max-width: 1300px) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30vh;
    width: 100%;
  }
`;
export const BoardBody = styled.tbody``;

export const TableRow = styled.tr`
  display: flex;
  width: 50%;
  height: 15%;
  @media only screen and (max-width: 800px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (min-width: 801px) and (max-width: 1100px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const Square = styled.td`
  border: 1px solid black;
  width: calc(10%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  padding: 16px;
  font-size: 8px;
  background-color: ${({ hasShip, hit, miss }) => {
    if (hasShip) {
      return hit ? "red" : "green";
    } else {
      return miss ? "gray" : "blue";
    }
  }};

  @media only screen and (max-width: 800px) {
    width: calc(10% - 8px);
  }
  @media only screen and (min-width: 801px) and (max-width: 1100px) {
    width: calc(10% - 64px);
  }

  &:hover {
    background-color: ${({ gameOn }) => !gameOn && "#e1c16e"};
    cursor: ${({ gameOn, turn }) => (!gameOn ? "pointer" : "not-allowed")};
  }
  &.hit {
    background-color: red;
    cursor: not-allowed;
  }
  &.miss {
    background-color: grey;
    cursor: not-allowed;
  }
  &.default {
    background-color: blue;
  }
`;
export const ComSquare = styled(Square)`
  cursor: not-allowed;
  &:hover {
    background-color: ${({ gameOn, turn }) =>
      gameOn && turn === "Player" && "yellow"};
    cursor: ${({ gameOn, turn }) =>
      gameOn && turn === "Player" ? "pointer" : "not-allowed"};
  }
`;
/*board end------------------------------------------------------------------ */

export const ShipDashboard = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

export const ShipInfo = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const PlayerShipButtons = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px 0;
`

export const PlaceAllPlayerShips = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  padding: 0;
  width: 100%;
`

export const StyledBtn = styled.button`
  background-color: #1e90ff;
  background-image: linear-gradient(to bottom right, #1e90ff, #187bcd);
  border: none;
  color: #fffafa;
  font-size: 12px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: 0.3s;

  &:hover {
    background-color: #187bcd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

export const RestartBtn = styled(StyledBtn)`
  background-color: #1abc9c;
  background-image: none;
  width: 25%;
  text-align-center;
  margin: 0 auto;

  &:hover {
    background-color: #16a085;
  }

  &:active {
    background-color: #16a085;
  }
`;

export const ShipBtn = styled.button`
  background-color: ${({ highlight }) => (highlight ? "#8B4000" : "#f39c12")};
  color: #ffffff;
  border: none;
  padding: 4px 8px;
  margin: 4px 4px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transform: translateY(1px);
  }
`;

export const ShipSelector = styled.section`
  display: flex;
  flex-direction: column;
`

export const Winner = styled.h1`
  text-align: center;
`

export const WinnerDisplay = styled.section`
  text-align:center;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Turn = styled.h1`
  text-align: center;
`

export const MobileSection = styled.section`
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 8px 16px;
  cursor: pointer;

  @media only screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 801px) and (max-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const MobileBtn = styled(StyledBtn)`
  background-color: pink;
  background-image: linear-gradient(to bottom right, pink, purple)

`

export const DesktopSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px;

  @media only screen and (max-width: 800px) {
    display: none;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 801px) and (max-width: 1100px) {
    display: none;
    justify-content: center;
    align-items: center;
  }
`;

export const Labels = styled.tr`
  display: flex;
  width: 100%
`
export const ShipStats = styled.section`
  margin: 8px 8px;
`
