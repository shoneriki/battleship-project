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
import AppSection,  {comPlaceAllShips } from "../App";
import { act } from "react-test-renderer";

test("computer board renders", () => {
  render(<AppSection />);
  const ComBoard = screen.getByTestId("Computer-board");
  expect(ComBoard).toBeInTheDocument();
});

test("computer board can place ships", async() => {
  render(<AppSection />);
  const button = screen.getByTestId("place-ships-btn");
  expect(button).toBeInTheDocument
  userEvent.click(button)
  await waitFor(() => {
    expect(button).not.toBeInTheDocument();
  });
})
