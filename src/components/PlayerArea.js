import {
  PlayerTitle,
  Board,
  BoardBody,
  TableRow,
  Square,
  ShipDashboard,
  ShipInfo,
  ShipStats,
  ShipSelector,
  PlayerShipButtons,
  PlaceAllPlayerShips,
} from "./StyledComponents";

const PlayerArea = ({
  Player,
  humanBoard,
  humanDirection,
  humanPlaceShip,
  randomPlaceShips,
  handleRandomPlayerShipPlacement,
  shipsToPlace,
  humanShips,
  humanShipCoords,
  humanShipSegmentsOnBoard,
  allHumanShipsPlaced,
  humanShip,
  setHumanShip,
  gameOn,
  turn,

}) => {
  const Info = ({ Player, humanDirection, gameOn }) => {
    return (
      <>
        <PlayerTitle>{Player}</PlayerTitle>
        {!allHumanShipsPlaced && (
          <ShipDashboard data-testid={`${Player}-ship-info`}>
            <ShipSelector>
              <h6> h for horizontal, v for vertical</h6>
              <h6>
                {humanShip.name},
                {humanDirection === "h" ? "horizontal" : "vertical"},{" "}
                {humanShip.length}
              </h6>
              <PlayerShipButtons>
                {shipsToPlace.map((ship) => {
                  return (
                    <button key={ship.name} onClick={(e) => setHumanShip(ship)}>
                      {ship.name}
                    </button>
                  );
                })}
              </PlayerShipButtons>
            </ShipSelector>

            <PlaceAllPlayerShips>
              <button
                onClick={handleRandomPlayerShipPlacement}
                data-testid={`${Player}-place-ships-btn`}
              >
                please place ships for me
              </button>
            </PlaceAllPlayerShips>
          </ShipDashboard>
        )}
        <section>
          {allHumanShipsPlaced && (
            <ShipInfo data-testid={`${Player}-ship-info`}>
              {humanShips.map((ship) => {
                return (
                  <ShipStats key={ship.name}>
                    <h6>{ship.name}</h6>
                    <h6>hp: {ship.hp}</h6>
                  </ShipStats>
                );
              })}
            </ShipInfo>
          )}
        </section>
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
                      : null
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
        gameOn={gameOn}
      />
      <PlayerBoard
        Player={Player}
      />
    </section>
  );
};

export default PlayerArea;
