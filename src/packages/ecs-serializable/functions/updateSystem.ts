import { System } from "../../ecs/System";
import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../types/ECSDefinition";
import { DeserializationMemory } from "../DeserializationMemory";
import { commitEntities } from "./commitEntities";
import { commitComponents } from "./commitComponents";

/**
 * Updates a System instance with the specified ECSDefinition
 */
export const updateSystem = (
  system: System,
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
    memory
  );
};
