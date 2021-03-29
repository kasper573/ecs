import { createActions } from "../ecs-interactive/createActions";
import { describeEntity } from "../ecs-describable/describeEntities";
import { System } from "../ecs/System";
import { Describable } from "../ecs-describable/Describable";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { describeSystem } from "../ecs-describable/describeSystem";
import { Entity } from "../ecs/Entity";
import { Inventory } from "./Inventory";
import { Collectable } from "./Collectable";

test("Picking up a Collectable entity removes it from the scene", () => {
  const { entity, pickUp, sceneManager } = setup();
  pickUp.perform();
  expect(sceneManager.scene).not.toContain(entity);
});

test("A Collectable entity in your inventory has its pick up action disabled", () => {
  const { system, pickUp } = setup();
  pickUp.perform();
  expect(createActions(system)).not.toContainEqual(pickUp);
});

test("Collectable entities in the scene are described", () => {
  const { entity } = setup();
  expect(describeEntity(entity)).toContain("A visible entity");
});

test("Collectable entities in the inventory are not described", () => {
  const { system, pickUp } = setup();
  pickUp.perform();
  expect(describeSystem(system)).not.toContain("A visible entity");
});

const setup = () => {
  const entity = new Entity([
    new Describable({ description: "A visible entity" }),
    new Collectable(),
  ]);
  const sceneManager = new SceneManager({ default: [entity] });
  const inventory = new Inventory();
  const system = new System({
    modules: [sceneManager, inventory],
    entities: () => [...(sceneManager.scene ?? []), ...inventory],
  });
  const [pickUp] = createActions(system);
  return { entity, system, pickUp, sceneManager };
};
