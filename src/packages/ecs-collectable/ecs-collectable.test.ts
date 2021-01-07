import { createActions } from "../ecs-interactive/createActions";
import { describeEntity } from "../ecs-describable/describeEntities";
import { System } from "../ecs/System";
import { StatefulEntity } from "../ecs/StatefulEntity";
import { Describable } from "../ecs-describable/Describable";
import { SceneManager } from "../ecs-scene-manager/SceneManager";
import { HasInventory } from "./HasInventory";
import { Inventory } from "./Inventory";
import { Collectable, CollectableEntityState } from "./Collectable";

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

it("Collectable entities in the inventory are not described", () => {
  const { entity, pickUp } = setup();
  pickUp.perform();
  expect(describeEntity(entity)).not.toContain("A visible entity");
});

const setup = () => {
  const entity = new StatefulEntity<CollectableEntityState, HasInventory>(
    { name: "entity" },
    [new Describable({ description: "A visible entity" }), new Collectable()]
  );
  const sceneManager = new SceneManager("default", { default: [entity] });
  const system = new System<HasInventory>({
    modules: [sceneManager],
    state: { inventory: new Inventory() },
    entities: (state) => [...(sceneManager.scene ?? []), ...state.inventory],
  });
  const [pickUp] = createActions(system);
  return { entity, system, pickUp, sceneManager };
};
