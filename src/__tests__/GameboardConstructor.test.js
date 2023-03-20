import { GameboardConstructor } from "../components/GameboardConstructor"
import ShipConstructor from "../components/ShipConstructor"


test("board is oriented where x is horizontal and y is vertical", () => {
  const gameboard = GameboardConstructor()
  const bottomLeft = gameboard.board[0][0]
  const test = gameboard.board[1][5]
  const topRight = gameboard.board[9][9]

  expect(bottomLeft.x).toEqual(0)
  expect(bottomLeft.y).toEqual(0)
  expect(topRight.x).toEqual(9)
  expect(topRight.y).toEqual(9)
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
