import { render, screen, getByTestId, fireEvent, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
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

/* end react tests */
