import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../types/ECSDefinition";
import { DeserializationMemory } from "../DeserializationMemory";
import { DeserializedSystem } from "../types/DeserializedSystem";
import { updateSystem } from "./updateSystem";

/**
 * Creates a System instance for the specified ECSDefinition
 */
export const createSystem = (
  ecs: ECSDefinition,
  memory: DeserializationMemory,
  nativeComponents: NativeComponents
) => {
  const system = new DeserializedSystem();
  updateSystem(system, ecs, memory, nativeComponents);
  return system;
};
