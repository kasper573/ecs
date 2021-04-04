import { System } from "../../ecs/System";
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
  const system = new System({
    modules: [sceneManager, new InteractionMemory()],
    entities: () => sceneManager.scene ?? [],
  });
  updateSystem(system, ecs, nativeComponents);
  return system;
};
