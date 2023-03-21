import { cloneElement } from "react"
import { GameboardConstructor } from "../components/GameboardConstructor"
import ShipConstructor from "../components/ShipConstructor"


test("board is oriented where y goes TOP TO BOTTOM and x goes left to right", () => {
  const gameboard = GameboardConstructor()
  const bottomRight = gameboard.board[9][9]

  gameboard.board[9][9] = "testBottomRight"
  expect(bottomRight.x).toBe(9)
  expect(bottomRight.y).toBe(9)

  gameboard.board[0][0] = "testTopLeft"
  console.table(gameboard.board)

})

test("placing ship on board", () => {
  const gameboard = GameboardConstructor()
  const destroyer = ShipConstructor("destroyer")
  const submarine = ShipConstructor("submarine")
  let board = gameboard.board
  gameboard.placeShip(destroyer, 0, 0, "h", gameboard.board)
  expect(board[0][0].hasShip).toEqual(destroyer)
  expect(board[1][0].hasShip).toEqual(destroyer)

  gameboard.placeShip(submarine, 0,1, "v", gameboard.board )
  expect(board[0][1].hasShip).toEqual(submarine)
  expect(board[0][2].hasShip).toEqual(submarine)


})
