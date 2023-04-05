import { render, screen, getByTestId, fireEvent, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect'
import {ShipConstructor}  from "../components/ShipConstructor";
import PlayerArea from "../components/PlayerArea";
import TestPlayerArea from "../components/TestPlayerArea"
import AppSection from "../App";
import { act } from "react-test-renderer";
import {expect, jest, test} from '@jest/globals'

test("player board renders", () => {
  render(<AppSection/>)
  const PlayerBoard = screen.getByTestId("Player-board");
  expect(PlayerBoard).toBeInTheDocument()
})

test("ship can be placed", async () => {
  const testHumanPlaceShip = jest.fn((ship, v, h, direction, board) => {});
  const testShips = [ShipConstructor("destroyer")];
  const testBoard = [
    [
      { v: 0, h: 0, hasShip: 0 },
      { v: 0, h: 1, hasShip: 0 },
    ],
    [
      { v: 1, h: 0, hasShip: 0 },
      { v: 1, h: 1, hasShip: 0 },
    ],
  ];
  render(
    <TestPlayerArea
      Player={"Player"}
      playerBoard={testBoard}
      playerShips={testShips}
      testHumanPlaceShip={testHumanPlaceShip}
      gameOn={false}
      turn={"computer"}
    />
  );
  const square = screen.getByTestId("Player-cell-0-0");
  expect(getComputedStyle(square).getPropertyValue("background-color")).not.toBe("green")
  userEvent.click(square);
  testHumanPlaceShip(testShips[0], 0, 0, "h", testBoard);
  setTimeout(() => {
    expect(getComputedStyle(square).getPropertyValue("background-color")).toBe(
      "green"
    );
    const { v, h } = square.dataset;
    const boardSquare = testBoard[v][h];
    expect(boardSquare.hasShip).toBe("des");
  }, 1000);
})

test("when all ships are placed, ships can't be placed", async () => {
    const testHumanPlaceShip = jest.fn((ship, v, h, direction, board) => {});
    const testShips = [ShipConstructor("destroyer"), ShipConstructor("cruiser")];
    const testBoard = [
      [
        { v: 0, h: 0, hasShip: "des" },
        { v: 0, h: 1, hasShip: "des" },
        { v: 0, h: 2, hasShip: 0 },
      ],
      [
        { v: 1, h: 0, hasShip: 0 },
        { v: 1, h: 1, hasShip: 0 },
        { v: 1, h: 2, hasShip: 0 },
      ],
      [
        { v: 2, h: 0, hasShip: 0 },
        { v: 2, h: 1, hasShip: 0 },
        { v: 2, h: 2, hasShip: 0 },
      ],
    ];
    render(
      <TestPlayerArea
        Player={"Player"}
        playerBoard={testBoard}
        playerShips={testShips}
        testHumanPlaceShip={testHumanPlaceShip}
        gameOn={false}
        turn={"computer"}
      />
    );
    setTimeout(() => {
      const playerInfo = screen.getByTestId("Player-ship-info");
      expect(playerInfo).toBeInTheDocument
    }, 1000)
    const square = screen.getByTestId("Player-cell-1-0")
    userEvent.click(square)
    testHumanPlaceShip(testShips[0], 0, 2, "v", testBoard)
    setTimeout(() => {
      expect(playerInfo).not.toBeInTheDocument
    }, 1000)
})

test("computer able to attack player", async () => {
  const getCoords = jest.fn().mockReturnValue([0,0])
  const mockAttackPlayer = jest.fn((board, ships, getRandomCoords) => {
    ships[0].isHit()
  });

  const testShips = [
    ShipConstructor("destroyer"),
    ShipConstructor("cruiser")
  ];

  const testBoard = [
    [
      { v: 0, h: 0, hasShip: "des", hit: false, miss: false },
      { v: 0, h: 1, hasShip: "des", hit: false, miss: false },
      { v: 0, h: 2, hasShip: 0, hit: false, miss: false },
      { v: 0, h: 3, hasShip: 0, hit: false, miss: false },
      { v: 0, h: 4, hasShip: 0, hit: false, miss: false },
    ],
    [
      { v: 1, h: 0, hasShip: "cru", hit: false, miss: false },
      { v: 1, h: 1, hasShip: 0, hit: false, miss: false },
      { v: 1, h: 2, hasShip: 0, hit: false, miss: false },
      { v: 1, h: 3, hasShip: 0, hit: false, miss: false },
      { v: 1, h: 4, hasShip: 0, hit: false, miss: false },
    ],
    [
      { v: 2, h: 0, hasShip: "cru", hit: false, miss: false },
      { v: 2, h: 1, hasShip: 0, hit: false, miss: false },
      { v: 2, h: 2, hasShip: 0, hit: false, miss: false },
      { v: 2, h: 3, hasShip: 0, hit: false, miss: false },
      { v: 2, h: 4, hasShip: 0, hit: false, miss: false },
    ],
    [
      { v: 3, h: 0, hasShip: "cru", hit: false, miss: false },
      { v: 3, h: 1, hasShip: 0, hit: false, miss: false },
      { v: 3, h: 2, hasShip: 0, hit: false, miss: false },
      { v: 3, h: 3, hasShip: 0, hit: false, miss: false },
      { v: 3, h: 4, hasShip: 0, hit: false, miss: false },
    ],
    [
      { v: 4, h: 0, hasShip: 0, hit: false, miss: false },
      { v: 4, h: 1, hasShip: 0, hit: false, miss: false },
      { v: 4, h: 2, hasShip: 0, hit: false, miss: false },
      { v: 4, h: 3, hasShip: 0, hit: false, miss: false },
      { v: 4, h: 4, hasShip: 0, hit: false, miss: false },
    ],
  ];

  const mockShip = testShips[0];
  const mockIsHit = mockShip.isHit;
  mockShip.isHit = jest.fn(() => {
    mockIsHit.call(mockShip);
  })


  render(<TestPlayerArea
    Player={"Player"}
    playerBoard={testBoard}
    playerShips={testShips}
    gameOn={true}
    attackPlayer={mockAttackPlayer}
    turn={"computer"}
  />)

  const square = screen.getByTestId("Player-cell-0-0")
  mockAttackPlayer(testBoard, testShips,getCoords)
  expect(mockShip.isHit).toHaveBeenCalledTimes(1);
  expect(mockShip.hp).toBe(1);

  await new Promise(resolve => setTimeout(resolve, 100))
  setTimeout(() => {
    expect(
      getComputedStyle(square).getPropertyValue("background-color")
    ).toBe("red")
  }, 500)
})

/*functions to be used for the next test*/

// const getAdjacentCoord = (v, h, board, hitCoords) => {
//   const directions = [
//     // [h(orizontal), v(ertocal)]
//     [-1, 0], // up
//     [0, 1], // right
//     [1, 0], // down
//     [0, -1], // left
//   ];
//   // randomly select one of the above arrays out of the directions array. i.e. directions[0] or [-1,0]
//   const randomDirection =
//     directions[Math.floor(Math.random() * directions.length)];
//   // destructure randomDirection with vDiff, hDiff (if [-1,0], vDiff === -1, hDiff === 0)
//   const [vDiff, hDiff] = randomDirection;
//   const newV = v + vDiff;
//   const newH = h + hDiff;
//   if (
//     newV >= 0 &&
//     newV < board.length &&
//     newH >= 0 &&
//     newH < board[0].length
//   ) {
//     const hitCoordExists = hitCoords.some(
//       ([v, h]) => v === newV && h === newH
//     );
//     if (!hitCoordExists) {
//       return [newV, newH];
//     }
//   }
//   return getAdjacentCoord(v, h, board, hitCoords);
// };

// const getOppositeAdjacentCoord = (
//   lastHitV,
//   lastHitH,
//   adjacentV,
//   adjacentH,
//   board,
//   hitPlayerCoords
// ) => {
//   const isAdjacentCoordValid = (v, h) => {
//     return (
//       v >= 0 &&
//       v < board.length &&
//       h >= 0 &&
//       h < board[0].length &&
//       h >= 0 &&
//       h < board[0].length &&
//       !hitPlayerCoords.some(
//         ([vertical, horizontal]) => vertical === v && horizontal === h
//       )
//     );
//   };

//   const vDirection = lastHitV - adjacentV;
//   const hDirection = lastHitH - adjacentH;

//   const nextVCoord = adjacentV + vDirection;
//   const nextHCoord = adjacentH + hDirection;

//   if (
//     isAdjacentCoordValid(nextVCoord, nextHCoord) &&
//     board[nextVCoord][nextHCoord].hasShip !== 0
//   ) {
//     return [nextVCoord, nextHCoord];
//   }

//   const oppositeVCoord = lastHitV + vDirection * -1;
//   const oppositeHCoord = lastHitH + hDirection * -1;

//   if (
//     isAdjacentCoordValid(oppositeVCoord, oppositeHCoord) &&
//     board[oppositeVCoord][oppositeHCoord].hasShip !== 0
//   ) {
//     return [oppositeVCoord, oppositeHCoord];
//   }

//   const getNextValidAdjacentCoord = () => {
//     const adjacentCoords = [
//       [adjacentH - 1, adjacentV],
//       [adjacentH + 1, adjacentV],
//       [adjacentH, adjacentV - 1],
//       [adjacentH - 1, adjacentV + 1],
//     ];

//     const validCoords = adjacentCoords.filter((h, v) =>
//       isAdjacentCoordValid(h, v)
//     );
//     return validCoords[Math.floor(Math.random() * validCoords.length)];
//   };
//   return getNextValidAdjacentCoord();
// };

// const adjacentCoord = jest.fn(() => [0,1])
// const getOppositeAdjacentCoord = jest.fn(() => [0,2])

/* end functions to be used for the next test*/

test("when computer hits player's ship, next attack should be near that previous hit", async () => {
  const testShips = [ShipConstructor("cruiser")];

  const testBoard = [
    [
      { v: 0, h: 0, hasShip: "cru", hit: false, miss: false },
      { v: 0, h: 1, hasShip: "cru", hit: false, miss: false },
      { v: 0, h: 2, hasShip: "cru", hit: false, miss: false },
    ],
    [
      { v: 1, h: 0, hasShip: 0, hit: false, miss: false },
      { v: 1, h: 1, hasShip: 0, hit: false, miss: false },
      { v: 1, h: 2, hasShip: 0, hit: false, miss: false },
    ],
    [
      { v: 2, h: 0, hasShip: 0, hit: false, miss: false },
      { v: 2, h: 1, hasShip: 0, hit: false, miss: false },
      { v: 2, h: 2, hasShip: 0, hit: false, miss: false },
    ],
  ];

  const hitCoords = [];
  const mockGetCoords = jest.fn();
  mockGetCoords.mockReturnValueOnce([0, 1]).mockReturnValueOnce([0, 2]);

  const mockAttackPlayer = jest.fn((board, ships) => {
    const [v, h] = mockGetCoords(board, ships);
    const cell = board[v][h];
    if (cell.hasShip !== 0) {
      const ship = ships.find(
        (ship) => ship.name.slice(0, 3).toLowerCase() === cell.hasShip
      );
      ship.isHit();
      cell.hit = true;
      hitCoords.push([v, h]);
      const getAdjacentCoords = (v, h) => {
        const adjacentCoords = [
          [v - 1, h],
          [v + 1, h],
          [v, h - 1],
          [v, h + 1],
        ];
        const validCoords = adjacentCoords.filter(
          ([v, h]) =>
            v >= 0 &&
            v < board.length &&
            h >= 0 &&
            h < board[0].length &&
            !board[v][h].hit &&
            !board[v][h].miss
        );
        return validCoords;
      };
      const adjacentCoords = getAdjacentCoords(v, h);
      console.log("adjacentCoords", adjacentCoords)

      // Make second attack to adjacent cell
      if (adjacentCoords.length > 0) {
        const [nextV, nextH] = adjacentCoords[0];
        const nextCell = board[nextV][nextH];
        if (nextCell.hasShip !== 0) {
          const nextShip = ships.find(
            (ship) => ship.name.slice(0, 3).toLowerCase() === nextCell.hasShip
          );
          nextShip.isHit();
          nextCell.hit = true;
          hitCoords.push([nextV, nextH]);
        } else {
          nextCell.miss = true;
        }
      }
    } else {
      cell.miss = true;
    }
  });

  render(
    <TestPlayerArea
      Player={"Player"}
      playerBoard={testBoard}
      playerShips={testShips}
      gameOn={true}
      attackPlayer={mockAttackPlayer}
      turn={"computer"}
    />
  );

  mockAttackPlayer(testBoard, testShips);

  expect(hitCoords).toContainEqual([0, 1]);

  // Call mockAttackPlayer again to simulate another attack to the adjacent cell
  mockAttackPlayer(testBoard, testShips);

  expect(hitCoords).toEqual(
    expect.arrayContaining([
      [0, 1],
      [0, 2],
    ])
  );
});
