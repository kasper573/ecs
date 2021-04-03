import { uniq } from "lodash";
import { without } from "lodash";
import { EntityDefinition } from "../types/EntityDefinition";
import { EntityInitializer } from "../types/EntityInitializer";
import { DeserializationMemory } from "../DeserializationMemory";
import { defineEntity } from "./defineEntity";

/**
 * Removes, defines, initializes and/or updates entity constructors and instances
 */
export const commitEntities = (
  definitions: EntityDefinition[],
  initializers: EntityInitializer[],
  memory: DeserializationMemory
) => {
  const allDefinitionIds = uniq([
    ...definitions.map((d) => d.id),
    ...initializers.map((i) => i.definitionId),
  ]);

  // Remove expired entity constructors
  const currentDefinitionIds = Array.from(memory.entityConstructors.keys());
  const removedDefinitionIds = without(
    currentDefinitionIds,
    ...allDefinitionIds
  );
  for (const id of removedDefinitionIds) {
    if (memory.entityConstructors.has(id)) {
      memory.entityConstructors.delete(id);
    }
  }

  // Remove expired entity instances
  const initializerIds = initializers.map((i) => i.id);
  const currentInstanceIds = Array.from(memory.entityInstances.keys());
  const removedInstanceIds = without(currentInstanceIds, ...initializerIds);
  for (const id of removedInstanceIds) {
    if (memory.entityInstances.has(id)) {
      memory.entityInstances.delete(id);
    }
  }

  // Define new entity constructors
  for (const definitionId of allDefinitionIds) {
    const definition = definitions.find((def) => def.id === definitionId);
    if (!definition) {
      throw new Error(
        "Entity initializer tried to reference unknown entity definition"
      );
    }

    let DefinedEntity = memory.entityConstructors.get(definition.id);
    if (!DefinedEntity) {
      DefinedEntity = defineEntity(definition);
      memory.entityConstructors.set(definition.id, DefinedEntity);
    }
  }

  // Define new or redefine existing entity instances
  for (const init of initializers) {
    let entity = memory.entityInstances.get(init.id);
    const definition = definitions.find((def) => def.id === init.definitionId)!;
    const DefinedEntity = memory.entityConstructors.get(init.definitionId)!;
    if (!entity) {
      entity = new DefinedEntity();
      memory.entityInstances.set(init.id, entity);
    }
    entity.define(definition, init, memory);
  }
};
