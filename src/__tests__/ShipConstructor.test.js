import ShipConstructor from "../components/ShipConstructor";

test("ships have appropriate hp's", () => {
  const carrier = ShipConstructor("carrier");
  const battleship = ShipConstructor("battleship");
  const cruiser = ShipConstructor("cruiser");
  const submarine = ShipConstructor("submarine");
  const destroyer = ShipConstructor("destroyer");

  expect((carrier.hp)).toBe(5)
  expect((battleship.hp)).toBe(4)
  expect((cruiser.hp)).toBe(3)
  expect((submarine.hp)).toBe(3)
  expect((destroyer.hp)).toBe(2)
})

test("carrier is hit", () => {
  const carrier = ShipConstructor("carrier");
  carrier.isHit()
  expect(carrier.hp).toBe(4)
})

test("carrier is sunk", () => {
  const carrier = ShipConstructor("carrier");
  carrier.isHit()
  carrier.isHit()
  carrier.isHit()
  carrier.isHit()
  carrier.isHit()
  expect(carrier.isSunk()).toBe(true)
})
