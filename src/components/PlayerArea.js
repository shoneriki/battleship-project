import {PlayerTitle, Board, BoardBody, TableRow, Square, ShipInfo} from "./StyledComponents"

const PlayerArea = ({
  /*  lifting state logic props---------------------------------------------*/
  Player,
  humanBoard,
  humanPlaceShip,
  humanRandomPlaceShips,
  placementError,
  humanShips,
  humanShipCoords,
  humanShipSegmentsOnBoard,
  humanShipsSunk,
  humanDirection,
  allHumanShipsPlaced,
  humanShip,
  setHumanShip,
  /* end lifting state logic props -----------------------------------------*/
}) => {

/* lifting state logic -----------------------------------------------------*/
  const SecondInfo = ({ Player, humanDirection }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        {Player !== "Computer" && !allHumanShipsPlaced && (
          <ShipInfo data-testid={`${Player}-ship-info`}>
            <section className="ShipSelector">
              <h6> h for horizontal, v for vertical</h6>
              <h6>
                {humanShip.name},{" "}
                {humanDirection === "h" ? "horizontal" : "vertical"},{" "}
                {humanShip.length}
              </h6>
              {/* <button
                onClick={humanRandomPlaceShips(humanBoard, humanShips)}
              >
                Screw that, please place ships for me
              </button> */}
              {humanShips.map((ship) => {
                return (
                  <button key={ship.name} onClick={(e) => setHumanShip(ship)}>
                    {ship.name}
                  </button>
                );
              })}
            </section>
          </ShipInfo>
        )}
      </>
    );
  };

  const SecondPlayerBoard = ({ Player }) => {
    return (
      <Board>
        <BoardBody data-testid={`${Player}-board`}>
          {humanBoard.map((row, v) => (
            <TableRow key={v}>
              {row.map((cell, h) => (
                <Square
                  key={`${v}, ${h}`}
                  v={cell.v}
                  h={cell.h}
                  hasShip={cell.hasShip}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  style={{
                    backgroundColor: cell.hasShip ? "green" : "blue",
                  }}
                  onClick={() => {
                    if (!allHumanShipsPlaced) {
                      try {
                        humanPlaceShip(humanShip, v, h, humanDirection, humanBoard);
                      } catch (error) {
                        alert(error.message);
                      }
                    } else {
                      alert("All ships have been placed");
                    }
                  }}
                ></Square>
              ))}
            </TableRow>
          ))}
        </BoardBody>
      </Board>
    );
  };

  /* end lifting state logic---------------------------------------------------*/


  // v for vertical, h for horizontal
  return (
    <section>
      <SecondInfo
        Player={Player}
        humanDirection={humanDirection}
      />
      <SecondPlayerBoard
        Player={Player}
      />
    </section>
  );
};

export default PlayerArea;
