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

  const getRandomCoords = (board) => {
    const v = Math.floor(Math.random() * board.length);
    const h = Math.floor(Math.random() * board.length);
    return [v,h]
  }

  const getSmartCoords = (lastHit, board, hitCoords) => {
    const [v, h] = lastHit;

    const getAdjacentCoords = (v, h) => {
      const adjacentCoords = [
        [v - 1, h],
        [v + 1, h],
        [v, h - 1],
        [v, h + 1],
      ];
      return adjacentCoords;
    };

    const getValidCoords = (coords, board) =>
      coords.filter(
        ([v, h]) =>
          v >= 0 &&
          v < board.length &&
          h >= 0 &&
          h < board.length &&
          !board[v][h].hit &&
          !board[v][h].miss
      );

      const direction = hitCoords.length >=  2 ?
      [
        // find vertical difference of last two hits
        // lastHit should be same as hitCoords[hitCoords.length - 1]
        lastHit[0] - hitCoords[hitCoords.length - 2][0],
        // find horizontal difference of last two hits
        lastHit[1] - hitCoords[hitCoords.length - 2][1]
      ]
      : null;
      let validCoords;
      if(direction !== null) {
        const nextCoords = [v + direction[0], h + direction[1]]
        validCoords = getValidCoords([nextCoords], board);
      } else {
        const adjacentCoords = getAdjacentCoords(v,h);
        validCoords = getValidCoords(adjacentCoords, board);
      }
      const randomIndex = Math.floor(Math.random() * validCoords.length);
      return validCoords[randomIndex]
  }

  const mockAttackPlayer = jest.fn((board, ships, hitCoords, forceHitCoords) => {
    let coords
    if (hitCoords.length === 0) {
      if(forceHitCoords) {
        coords = forceHitCoords;
      } else{
        coords = getRandomCoords(board);
      }
    } else {
     coords = getSmartCoords(hitCoords[hitCoords.length - 1], board, hitCoords);
    }
    const [v, h] = coords;
    const cell = board[v][h];

    if (cell.hasShip !== 0) {
      const ship = ships.find(
        (ship) => ship.name.slice(0, 3) === cell.hasShip
      );
      ship.isHit();
      cell.hit = true;
      hitCoords.push([v, h]);
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

  mockAttackPlayer(testBoard, testShips, hitCoords, [0,1]);

  expect(hitCoords).toContainEqual([0, 1]);

  // Call mockAttackPlayer again to simulate another attack to the adjacent cell
  mockAttackPlayer(testBoard, testShips, hitCoords, [0, 0]);

  expect(testBoard[0][0].hit).toBe(true);
  expect(hitCoords).toEqual(
    expect.arrayContaining([
      [0, 1],
      [0, 0],
    ])
  );

});
