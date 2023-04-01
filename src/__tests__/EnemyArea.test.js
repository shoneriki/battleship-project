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

test("attackCom should be called, with a resulting hit", async() => {
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

  const turn = "player";
  render(
    <TestEnemyArea
      Player="Computer"
      comBoard={testBoard}
      comShips={testShips}
      comShipSegmentsOnBoard={[]}
      gameOn = {true}
      attackCom={mockAttackCom}
      turn={turn}
    />
  );
  const square = screen.getByTestId("Computer-cell-0-0");
  act(() => {
    userEvent.click(square);
    expect(mockAttackCom).toHaveBeenCalledWith(0, 0, testBoard, testShips);
    setTimeout(() => {
      expect(
        getComputedStyle(square).getPropertyValue("background-color")
      ).toBe("red");
    }, 100);
  })
});

test("attackCom called with resulting miss", async () => {
  const mockAttackCom = jest.fn();
  const testShips = [ShipConstructor("destroyer")];
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

  const turn = "player";
  render(
    <TestEnemyArea
      Player="Computer"
      comBoard={testBoard}
      comShips={testShips}
      comShipSegmentsOnBoard={[]}
      gameOn={true}
      attackCom={mockAttackCom}
      turn={turn}
    />
  );
  const square = screen.getByTestId("Computer-cell-1-0");
  act(() => {
    userEvent.click(square);
    expect(mockAttackCom).toHaveBeenCalledWith(1, 0, testBoard, testShips);
    setTimeout(() => {
      expect(
        getComputedStyle(square).getPropertyValue("background-color")
      ).toBe("grey");
    }, 100);
  });
});
