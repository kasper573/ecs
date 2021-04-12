import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../definition/ECSDefinition";
import { DeserializationMemory } from "../DeserializationMemory";
import { DeserializedSystem } from "../types/DeserializedSystem";
import { commitEntities } from "./commitEntities";
import { commitComponents } from "./commitComponents";

/**
 * Updates a System instance with the specified ECSDefinition
 */
export const updateSystem = (
  system: DeserializedSystem,
  ecs: ECSDefinition,
  memory: DeserializationMemory,
  nativeComponents: NativeComponents
) => {
  commitComponents(
    Object.values(ecs.componentDefinitions),
    nativeComponents,
    memory
  );

  commitEntities(
    Object.values(ecs.entityDefinitions),
    Object.values(ecs.entityInitializers),
    memory,
    system.root
  );

  system.update();
};
