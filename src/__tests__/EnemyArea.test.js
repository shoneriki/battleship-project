import {
  render,
  screen,
  getByTestId,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { ShipConstructor } from "../components/ShipConstructor";
import EnemyArea from "../components/PlayerArea";
import TestComputerBoard from "../components/TestComputerBoard";
import AppSection, {attackCom} from "../App";
import { act } from "react-test-renderer";

test("computer board renders", () => {
  render(<AppSection />);
  const ComBoard = screen.getByTestId("Computer-board");
  expect(ComBoard).toBeInTheDocument();
});

test("computer board can place ships", async () => {
  render(<AppSection />);
  let secondButton = screen.queryByTestId("Computer-place-ships-btn");
  while (!secondButton) {
    await waitFor(
      () => {
        secondButton = screen.queryByTestId("Computer-place-ships-btn");
      },
      { timeout: 1000 }
    );
  }
  act(() => {
    userEvent.click(secondButton);
  });
  await waitFor(() => screen.queryByTestId("Computer-place-ships-btn"), {
    timeout: 1000,
    interval: 100,
  });
  expect(
    screen.queryByTestId("Computer-place-ships-btn")
  ).not.toBeInTheDocument();
});

test("attackCom should hit a ship and return true", () => {
  const testShips = [
    ShipConstructor("Destroyer")
  ]
  const comBoard = [
    [
      { v: 0, h:0, hasShip: "des" },
      { v: 0, h:0, hasShip: "des" },
      { v: 0, h:0, hasShip: 0 },
    ],
    [
      { hasShip: 0, hit: false, miss: false },
      { hasShip: 1, hit: false, miss: false },
    ],
  ];
  const comShips = [{ name: "Test Ship", length: 1, hp: 1 }];

  const result = attackCom(0, 1, comBoard, testShips);

  expect(result).toBe(true);
  expect(comBoard[0][1].hit).toBe(true);
});
