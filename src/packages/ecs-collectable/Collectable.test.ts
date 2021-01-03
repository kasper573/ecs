import { Collectable } from "./Collectable";
import { World } from "../ecs/World";
import { Entity } from "../ecs/Entity";
import { Inventory } from "./Inventory";

describe("Collectable", () => {
  test("Picking up a Collectable entity removes it from the scene", () => {
    const { entity, world } = pickUp();
    expect(world.scene.includes(entity)).toBe(false);
  });

  test("A Collectable entity in your inventory has its pick up action disabled", () => {
    const { world, action } = pickUp();
    expect(world.actions).not.toContainEqual(action);
  });
});

const pickUp = () => {
  const entity = new Entity("entity", {}, () => [new Collectable()]);
  const world = new World({
    sceneId: "a",
    state: { inventory: new Inventory() },
    scenes: { a: [entity] },
  });
  const actionName = Collectable.prototype.action.call(null, entity);
  const action = world.actions.find((action) => action.name === actionName)!;
  action.perform(world);
  return { entity, world, action };
};
