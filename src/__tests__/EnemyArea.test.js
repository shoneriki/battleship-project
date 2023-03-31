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
import TestEnemyArea from "../components/TestEnemyArea";
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

test("attackCom should be called when a cell is clicked", async() => {
  const mockAttackCom = jest.fn();
  const testShips = [
    ShipConstructor("destroyer"),
  ];
  const testBoard = [
    [
      { v: 0, h: 0, hasShip: "des", hit: false, miss: false },
      { v: 0, h: 1, hasShip: "des", hit: false, miss: false },
    ],
    [
      { v: 1, h: 0, hasShip: 0, hit: false, miss: false },
      { v: 1, h: 1, hasShip: 0, hit: false, miss: false },
    ],
  ];
  const setComShips = jest.fn();
  const comPlaceAllShips = jest.fn();
  const handlePlaceComputerShips = jest.fn();
  const allComShipsPlaced = true;
  const gameOn = true;

  const hit = true;
  const miss = false;
  const turn = "player";
  render(
    <TestEnemyArea
      Player="Computer"
      comBoard={testBoard}
      comShips={testShips}
      comShipSegmentsOnBoard={[]}
      gameOn = {true}
      attackCom={mockAttackCom}
      turn={"player"}
    />
  );
  const square = screen.getByTestId("cell-0-0");

  while (!square) {
    await waitFor(
      () => {
        square = screen.queryByTestId("Computer-place-ships-btn");
      },
      { timeout: 1000 }
    );
  }
  act(() => {
    userEvent.click(square);
    expect(mockAttackCom).toHaveBeenCalledWith(0, 0, testBoard, testShips);
  })

});
