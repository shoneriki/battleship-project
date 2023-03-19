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
