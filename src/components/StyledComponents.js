import styled from "styled-components";


/* styles for appMain*/

export const AppSection = styled.main`
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

export const Boards = styled.section`
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

/* end styles for appMain*/

export const PlayerTitle = styled.h1`
  text-align: center;
`;

export const Board = styled.table`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
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
  cursor: pointer;
  background-color: blue;

  @media only screen and (max-width: 800px) {
    width: calc(10% - 8px);
  }
  @media only screen and (min-width: 801px) and (max-width: 1100px) {
    width: calc(10% - 64px);
  }
  &.hit {
    background-color: red;
    cursor: not-allowed;
  }
  &.miss {
    background-color: grey;
    cursor: not-allowed;
  }
`;
export const ComSquare = styled(Square)`
  cursor: default;
`
export const ShipInfo = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;
