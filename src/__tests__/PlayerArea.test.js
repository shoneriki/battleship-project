import { render, screen, getByTestId, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect'
import {ShipConstructor}  from "../components/ShipConstructor";
import PlayerArea from "../components/PlayerArea";
import AppSection from "../App";
import { act } from "react-test-renderer";

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

test("computer board renders", () => {
  render(<AppSection/>)
  const ComBoard = screen.getByTestId("Computer-board");
  expect(ComBoard).toBeInTheDocument()
})

/* end react tests */

