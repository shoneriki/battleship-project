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


/* react tests --------------------------------------------------------------*/

test("player board renders", () => {
  render(<AppSection/>)
  const PlayerBoard = screen.getByTestId("Player-board");
  expect(PlayerBoard).toBeInTheDocument()
})

test("ship can be placed", async () => {
  render(<AppSection/>)
  const square = screen.getByTestId("Player-cell-0-0")
  expect(getComputedStyle(square).getPropertyValue("background-color")).not.toBe("green")
  act(() => {
    userEvent.click(square)
    setTimeout(() => {
      expect(getComputedStyle(square).getPropertyValue("background-color")).toBe("green")
    }, 100)
  })
})

test("when all ships are placed, ships can't be placed", async () => {
  render(<AppSection/>)
  const square = screen.getByTestId("Player-cell-0-0")
  const playerInfo = screen.getByTestId("Player-ship-info");
  expect(getComputedStyle(square).getPropertyValue("background-color")).not.toBe("green")
  act(() => {
    userEvent.click(square)
    setTimeout(() => {
      expect(getComputedStyle(square).getPropertyValue("background-color")).toBe("green")
    }, 100)
  })
  const square2 = screen.getByTestId("Player-cell-1-0")
  expect(getComputedStyle(square2).getPropertyValue("background-color")).not.toBe("green")
  act(() => {
    userEvent.click(square2)
    setTimeout(() => {
      expect(getComputedStyle(square2).getPropertyValue("background-color")).toBe("green")
    }, 100)
  })
  const square3 = screen.getByTestId("Player-cell-2-0")
  expect(getComputedStyle(square3).getPropertyValue("background-color")).not.toBe("green")
  act(() => {
    userEvent.click(square3)
    setTimeout(() => {
      expect(getComputedStyle(square3).getPropertyValue("background-color")).toBe("green")
    }, 100)
  })
  const square4 = screen.getByTestId("Player-cell-3-0")
  expect(getComputedStyle(square4).getPropertyValue("background-color")).not.toBe("green")
  act(() => {
    userEvent.click(square4)
    setTimeout(() => {
      expect(getComputedStyle(square4).getPropertyValue("background-color")).toBe("green")
    }, 100)
  })
  const square5 = screen.getByTestId("Player-cell-4-0")
  expect(getComputedStyle(square5).getPropertyValue("background-color")).not.toBe("green")
  act(() => {
    userEvent.click(square5)
    setTimeout(() => {
      expect(getComputedStyle(square5).getPropertyValue("background-color")).not.toBe("green")
    }, 100)
  })
  await waitFor(() => {
    expect(playerInfo).not.toBeInTheDocument()
  })

})

test("computer able to attack player", async () => {
  const getRandomCoords = jest.fn().mockReturnValue([0,0])
  const mockAttackPlayer = jest.fn();

  const testShips = [
    ShipConstructor("destroyer"),
  ];
  const testBoard = [
    [
      {v: 0, h: 0, hasShip: "des", hit: false, miss: false},
      {v: 0, h: 1, hasShip: "des", hit: false, miss: false},
    ],
    [
      {v: 1, h: 0, hasShip: 0, hit: false, miss: false},
      {v: 1, h: 1, hasShip: 0, hit: false, miss: false},
    ]
  ]
  render(<TestPlayerArea
    Player={"Player"}
    playerBoard={testBoard}
    playerShips={testShips}
    gameOn={true}
    attackPlayer={mockAttackPlayer}
    turn={"computer"}
  />)
  const square = screen.getByTestId("Player-cell-0-0")
  mockAttackPlayer(testBoard, testShips, getRandomCoords)
  setTimeout(() => {
    expect(
      getComputedStyle(square).getPropertyValue("background-color")
    ).toBe("red")
  }, 100)

})

/* end react tests */
