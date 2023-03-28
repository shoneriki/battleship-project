import {PlayerTitle, Board, BoardBody, TableRow, Square, ShipInfo} from "./StyledComponents"

const PlayerArea = ({
  Player,
  humanBoard,
  humanPlaceShip,
  humanRandomPlaceShips,
  handleRandomPlayerShipPlacement,
  humanShips,
  humanShipCoords,
  humanShipSegmentsOnBoard,
  humanShipsSunk,
  humanDirection,
  allHumanShipsPlaced,
  humanShip,
  setHumanShip,
  gameOn,
}) => {

  const Info = ({ Player, humanDirection }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        {Player !== "Computer" && !allHumanShipsPlaced && (
          <ShipInfo data-testid={`${Player}-ship-info`}>
            <section className="ShipSelector">
              <h6> h for horizontal, v for vertical</h6>
              <h6>
                {humanShip.name},
                {humanDirection === "h" ? "horizontal" : "vertical"},{" "}
                {humanShip.length}
              </h6>
              <button
                onClick={handleRandomPlayerShipPlacement}
                data-testid={`${Player}-place-ships-btn`}
              >
                please place ships for me
              </button>
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

  const PlayerBoard = ({ Player }) => {
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
                  allHumanShipsPlaced={allHumanShipsPlaced}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  style={{
                    backgroundColor: cell.hasShip ? "green" : "blue",
                    cursor: allHumanShipsPlaced ? "default" : "pointer",
                  }}
                  onClick={
                    !allHumanShipsPlaced
                      ? () => {
                          try {
                            humanPlaceShip(
                              humanShip,
                              v,
                              h,
                              humanDirection,
                              humanBoard
                            );
                          } catch (error) {
                            alert(error.message);
                          }
                        }
                      : undefined
                  }
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
      <Info
        Player={Player}
        humanDirection={humanDirection}
      />
      <PlayerBoard
        Player={Player}
      />
    </section>
  );
};

export default PlayerArea;
