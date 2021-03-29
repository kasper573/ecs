import { System } from "../../ecs/System";
import { Inventory } from "../../ecs-collectable/Inventory";
import { InteractionMemory } from "../../ecs-interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../types/ECSDefinition";
import { updateSystem } from "./updateSystem";

/**
 * Creates a System instance for the specified ECSDefinition
 */
export const createSystem = (
  ecs: ECSDefinition,
  nativeComponents: NativeComponents
): System => {
  const sceneManager = new SceneManager({});
  const inventory = new Inventory();
  const system = new System({
    modules: [sceneManager, inventory, new InteractionMemory()],
    entities: () => [...(sceneManager.scene ?? []), ...inventory],
  });
  updateSystem(system, ecs, nativeComponents);
  return system;
};
