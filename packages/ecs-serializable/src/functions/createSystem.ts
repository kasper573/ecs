import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../definition/ECSDefinition";
import { DeserializationMemory } from "../DeserializationMemory";
import { DeserializedSystem } from "../types/DeserializedSystem";
import { updateSystem } from "./updateSystem";

/**
 * Creates a System instance for the specified ECSDefinition
 */
export const createSystem = (
  ecs: ECSDefinition,
  memory: DeserializationMemory,
  nativeComponents: NativeComponents,
  context?: Record<string, unknown>
) => {
  const system = new DeserializedSystem();
  if (context) {
    system.setContext(context);
  }
  updateSystem(system, ecs, memory, nativeComponents);
  return system;
};
