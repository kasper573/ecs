import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { describeEntity } from "../ecs-describable/describeEntities";
import { createActions } from "../ecs-interactive/createActions";
import { Inventory } from "./Inventory";
import { Describable } from "./Describable";
import { Collectable } from "./Collectable";

describe("Collectable", () => {
  test("Picking up a Collectable entity removes it from the scene", () => {
    const { entity, system, pickUp } = setup();
    pickUp.perform(system);
    expect(system.scene.includes(entity)).toBe(false);
  });

  test("A Collectable entity in your inventory has its pick up action disabled", () => {
    const { system, pickUp } = setup();
    pickUp.perform(system);
    expect(createActions(system)).not.toContainEqual(pickUp);
  });
});

describe("Describable", () => {
  test("Collectable entities in the scene are described", () => {
    const { entity, system } = setup();
    expect(describeEntity(entity, system)).toContain("A visible entity");
  });

  test("Collectable entities in the inventory are not described", () => {
    const { entity, system, pickUp } = setup();
    pickUp.perform(system);
    expect(describeEntity(entity, system)).not.toContain("A visible entity");
  });
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
