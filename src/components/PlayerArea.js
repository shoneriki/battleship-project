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
  StyledBtn,
  ShipBtn,
  MobileSection,
  MobileBtn,
} from "./StyledComponents";

const PlayerArea = ({
  Player,
  humanBoard,
  humanDirection,
  setHumanDirection,
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
              <h6>
                {humanShip.name.charAt(0).toUpperCase() + humanShip.name.slice(1)}, {" "}
                {humanDirection === "h" ? "Horizontal" : "Vertical"}, {" "}
                {humanShip.length}
              </h6>
              <PlayerShipButtons>
                {shipsToPlace.map((ship) => {
                  return (
                    <ShipBtn key={ship.name} onClick={(e) => setHumanShip(ship)}>
                      {ship.name.charAt(0).toUpperCase() + ship.name.slice(1)}
                    </ShipBtn>
                  );
                })}
              </PlayerShipButtons>
              <MobileSection>
                <MobileBtn
                  onClick={() => setHumanDirection("h" ? "v" : "h")}
                >
                  Change To {humanDirection === "h" ? "Vertical" : "Horizontal"} Orientation
                </MobileBtn>
              </MobileSection>
            </ShipSelector>

            <PlaceAllPlayerShips>
              <StyledBtn
                onClick={handleRandomPlayerShipPlacement}
                data-testid={`${Player}-place-ships-btn`}
              >
                Please Place Ships For Me
              </StyledBtn>
            </PlaceAllPlayerShips>
          </ShipDashboard>
        )}
        <section>
          {allHumanShipsPlaced && (
            <ShipInfo data-testid={`${Player}-ship-info`}>
              {humanShips.map((ship) => {
                return (
                  <ShipStats key={ship.name}>
                    <h6>
                      {ship.name.charAt(0).toUpperCase() + ship.name.slice(1)}
                    </h6>
                    <h6>HP: {ship.hp}</h6>
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
                  hit={cell.hit}
                  miss={cell.miss}
                  allHumanShipsPlaced={allHumanShipsPlaced}
                  data-testid={`${Player}-cell-${v}-${h}`}
                  gameOn={gameOn}
                  turn={turn}
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
