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
import ComputerBoard from "../components/ComputerBoard";
import AppSection from "../App";
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

// test("render red ComSquare when hasShip is not 0", async () => {
//   render(<ComputerBoard/>)
//   const comSquares = screen.queryAllByTestId("cell-*");
//   const squareWithShip = comSquares.find((square) => {
//     console.log("square?",square)
//   });
//   act(() => {
//     userEvent.click(squareWithShip);
//   });
//   await waitFor(() => {
//     expect(
//       getComputedStyle(squareWithShip).getPropertyValue("background-color")
//     ).toBe("red");
//   });
// });
