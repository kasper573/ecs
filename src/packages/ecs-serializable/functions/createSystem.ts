import { System } from "../../ecs/System";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../types/ECSDefinition";
import { DeserializationMemory } from "../DeserializationMemory";
import { updateSystem } from "./updateSystem";

/**
 * Creates a System instance for the specified ECSDefinition
 */
export const createSystem = (
  ecs: ECSDefinition,
  memory: DeserializationMemory,
  nativeComponents: NativeComponents
): System => {
  const sceneManager = new SceneManager({});
  const system = new System({
    modules: [sceneManager],
    entities: () => sceneManager.scene ?? [],
  });
  updateSystem(system, ecs, memory, nativeComponents);
  return system;
};
