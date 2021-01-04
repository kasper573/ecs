import { describeEntity } from "../ecs-describable/describeEntities";
import { Entity } from "../ecs/Entity";
import { System } from "../ecs/System";
import { createActions } from "../ecs-interactive/createActions";
import { Describable } from "./Describable";
import { Collectable } from "./Collectable";
import { Inventory } from "./Inventory";

test("Collectable entities in the scene are described", () => {
  const { entity, system } = setup();
  expect(describeEntity(entity, system)).toContain("A visible entity");
});

test("Collectable entities in the inventory are not described", () => {
  const { entity, system, pickUp } = setup();
  pickUp.perform(system);
  expect(describeEntity(entity, system)).not.toContain("A visible entity");
});

const setup = () => {
  const entity = new Entity("entity", {}, () => [
    new Describable({ describe: () => "A visible entity" }),
    new Collectable(),
  ]);
  const system = new System({
    sceneId: "a",
    state: { inventory: new Inventory() },
    scenes: { a: [entity] },
  });
  const pickUpName = Collectable.prototype.action.call(null, entity);
  const pickUp = createActions(system).find(
    (action) => action.name === pickUpName
  )!;
  return { entity, system, pickUp };
};
