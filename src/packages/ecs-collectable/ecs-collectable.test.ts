import { Collectable } from "./Collectable";
import { World } from "../ecs/World";
import { Entity } from "../ecs/Entity";
import { Inventory } from "./Inventory";
import { Describable } from "./Describable";
import { describeEntity } from "../ecs-describable/describeEntities";

describe("Collectable", () => {
  test("Picking up a Collectable entity removes it from the scene", () => {
    const { entity, world, pickUp } = setup();
    pickUp.perform(world);
    expect(world.scene.includes(entity)).toBe(false);
  });

  test("A Collectable entity in your inventory has its pick up action disabled", () => {
    const { world, pickUp } = setup();
    pickUp.perform(world);
    expect(world.actions).not.toContainEqual(pickUp);
  });
});

describe("Describable", () => {
  test("Collectable entities in the scene are described", () => {
    const { entity, world } = setup();
    expect(describeEntity(entity, world)).toContain("A visible entity");
  });

  test("Collectable entities in the inventory are not described", () => {
    const { entity, world, pickUp } = setup();
    pickUp.perform(world);
    expect(describeEntity(entity, world)).not.toContain("A visible entity");
  });
});

const setup = () => {
  const entity = new Entity("entity", {}, () => [
    new Describable({ describe: () => "A visible entity" }),
    new Collectable(),
  ]);
  const world = new World({
    sceneId: "a",
    state: { inventory: new Inventory() },
    scenes: { a: [entity] },
  });
  const pickUpName = Collectable.prototype.action.call(null, entity);
  const pickUp = world.actions.find((action) => action.name === pickUpName)!;
  return { entity, world, pickUp };
};
