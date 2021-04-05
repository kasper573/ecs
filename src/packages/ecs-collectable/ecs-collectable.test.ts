import { System } from "../ecs/System";
import { Describable } from "../ecs-describable/Describable";
import { Entity } from "../ecs/Entity";
import { describeSystem } from "../ecs-describable/describeSystem";
import { performCommand } from "../ecs-interactive/performCommand";
import { Inventory } from "./Inventory";
import { Collectable } from "./Collectable";

test("A Collectable entity not in your inventory has a pick up action", () => {
  const { system } = setup();
  expect(describeSystem(system)).toContain("Pick up entity");
});

test("A Collectable entity in your inventory has its pick up action disabled", () => {
  const { system } = setup();
  performCommand(system, "Pick up entity");
  expect(describeSystem(system)).not.toContain("Pick up entity");
});

test("Collectable entities not in inventory are described", () => {
  const { system } = setup();
  expect(describeSystem(system)).toContain("A visible entity");
});

test("Collectable entities in the inventory are not described", () => {
  const { system } = setup();
  performCommand(system, "Pick up entity");
  expect(describeSystem(system)).not.toContain("A visible entity");
});

const setup = () => {
  const entity = new Entity(
    [new Describable({ description: "A visible entity" }), new Collectable()],
    [],
    "entity"
  );
  const system = new System(entity, new Entity([new Inventory()]));
  return { entity, system };
};
