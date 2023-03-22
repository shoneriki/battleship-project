import { GameboardConstructor } from "../components/GameboardConstructor"
import {ShipConstructor} from "../components/ShipConstructor"


test("board is oriented where y goes TOP TO BOTTOM and x goes left to right", () => {
  const gameboard = GameboardConstructor()
  const bottomRight = gameboard.board[9][9]

  gameboard.board[9][9] = "testBottomRight"
  expect(bottomRight.v).toBe(9)
  expect(bottomRight.h).toBe(9)

  gameboard.board[0][0] = "testTopLeft"

})

test("placing ship on board", () => {
  const gameboard = GameboardConstructor()
  const destroyer = ShipConstructor("destroyer")
  const submarine = ShipConstructor("submarine")
  let board = gameboard.board
  let shipCoords = gameboard.shipCoords
  let totalShipParts = gameboard.totalShipParts

  gameboard.placeShip(destroyer, 0, 0, "h", gameboard.board)
  expect(board[0][0].hasShip).toEqual("des")
  expect(board[0][1].hasShip).toEqual("des")

  gameboard.placeShip(submarine, 1,0, "v", gameboard.board )
  expect(board[1][0].hasShip).toEqual("sub")
  expect(board[2][0].hasShip).toEqual("sub")
  expect(shipCoords).toStrictEqual([[0,0],[0,1],[1,0],[2,0],[3,0]])
  expect(totalShipParts).toStrictEqual(["des", "des", "sub", "sub", "sub",])
})
