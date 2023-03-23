import AppSection from "../App";
import Gameboard from "../components/PlayerArea";
import { ShipConstructor } from "../components/ShipConstructor";
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
  const ship = ShipConstructor("destroyer");
  const orientation = "h";
  const tile = screen.getByTestId("Player-cell-0-1");
  fireEvent.click(tile);
  // expect(tile.hasShip).toEqual("des");
});
