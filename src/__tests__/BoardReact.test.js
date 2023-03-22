import AppSection from "../App";
import Gameboard from "../components/PlayerArea";
import {
  render,
  screen,
  getByTestId,
  toBeInDocument,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("player board renders", () => {
  render(<AppSection />);
  const playerBoard = screen.getByTestId("Player-board");
  expect(playerBoard).toBeInTheDocument();
});

test("computer board renders", () => {
  render(<AppSection />);
  const computerBoard = screen.getByTestId("Computer-board");
  expect(computerBoard).toBeInTheDocument();
});

test("placeShip functionality in react", () => {
  render(<AppSection />);
  const playerBoard = screen.getByTestId("Player-board");
  const tile = screen.getByTestId("Player-cell-0-0");
});
