import { System } from "../../ecs/System";
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
  const system = new System();
  updateSystem(system, ecs, memory, nativeComponents);
  return system;
};
