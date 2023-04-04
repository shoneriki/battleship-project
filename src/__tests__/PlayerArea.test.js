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
  const getRandomCoords = jest.fn().mockReturnValue([0,0])
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
  mockAttackPlayer(testBoard, testShips,getRandomCoords)
  expect(mockShip.isHit).toHaveBeenCalledTimes(1);
  expect(mockShip.hp).toBe(1);

  await new Promise(resolve => setTimeout(resolve, 100))
  setTimeout(() => {
    expect(
      getComputedStyle(square).getPropertyValue("background-color")
    ).toBe("red")
  }, 500)
})
