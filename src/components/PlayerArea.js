import {
  PlayerTitle,
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
  DesktopSection,
  InfoContainer,
  
  Board,
  BoardBody,
  TableRow,
  Square,
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
      <InfoContainer>
        <PlayerTitle>{Player}</PlayerTitle>
        <DesktopSection>
          {!gameOn && (
            <h6>
              {humanDirection === "h"
                ? "Press v to change ship to vertical orientation"
                : "Press h to change ship to horizontal orientation"}{" "}
            </h6>
          )}
        </DesktopSection>
        {!allHumanShipsPlaced && (
          <ShipDashboard data-testid={`${Player}-ship-info`}>
            <ShipSelector>
              <h6>
                {`Please place
                ${humanDirection === "h" ? "horizontal" : "vertical"} ${
                  humanShip.name
                } with length of
                ${humanShip.length}`} on the board or select another ship
              </h6>
              <PlayerShipButtons>
                {shipsToPlace.map((ship) => {
                  return (
                    <ShipBtn
                      key={ship.name}
                      onClick={(e) => setHumanShip(ship)}
                      highlight={humanShip.name === ship.name}
                    >
                      {`${ship.name.charAt(0).toUpperCase() + ship.name.slice(1)}
                      ${ship.length}`}
                    </ShipBtn>
                  );
                })}
              </PlayerShipButtons>
              <MobileSection>
                <MobileBtn
                  onClick={() =>
                    setHumanDirection(humanDirection === "h" ? "v" : "h")
                  }
                >
                  Change To {humanDirection === "h" ? "Vertical" : "Horizontal"}{" "}
                  Orientation
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
      </InfoContainer>
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
