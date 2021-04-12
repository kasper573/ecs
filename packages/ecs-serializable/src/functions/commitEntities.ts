import { uniq } from "lodash";
import { without } from "lodash";
import { EntityDefinition } from "../definition/EntityDefinition";
import { EntityInitializer } from "../definition/EntityInitializer";
import { DeserializationMemory } from "../DeserializationMemory";
import { RedefinableEntity } from "../RedefinableEntity";
import { defined } from "../../../ecs-common/src/defined";
import { DeserializedEntity } from "../types/DeserializedEntity";
import { defineEntity } from "./defineEntity";

/**
 * Removes, defines, initializes and/or updates entity constructors and instances
 */
export const commitEntities = (
  definitions: EntityDefinition[],
  initializers: EntityInitializer[],
  memory: DeserializationMemory,
  root: DeserializedEntity
) => {
  const allDefinitionIds = uniq([
    ...definitions.map((d) => d.id),
    ...defined(initializers.map((i) => i.definitionId)),
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
      const entity = memory.entityInstances.get(id)!;
      entity.dispose();
      memory.componentProperties.delete(entity.id);
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
    if (init.definitionId) {
      // Instantiate entity using an EntityDefinition
      const def = definitions.find((def) => def.id === init.definitionId)!;
      const DefinedEntity = memory.entityConstructors.get(init.definitionId)!;
      if (!entity) {
        entity = new DefinedEntity(init.id);
        memory.entityInstances.set(init.id, entity);
      }
      entity.define(
        init.name || def.name,
        def.components,
        init.components,
        memory
      );
    } else {
      // Instantiate entity without an EntityDefinition
      if (!entity) {
        entity = new RedefinableEntity(init.id);
        memory.entityInstances.set(init.id, entity);
      }
      entity.define(init.name, [], init.components, memory);
    }
    if (init.isActive !== undefined) {
      entity.isActive = init.isActive;
    }
  }

  // Redefine entity parent-child relationships
  for (const init of initializers) {
    const child = memory.entityInstances.get(init.id)!;
    const parent = init.parentId
      ? memory.entityInstances.get(init.parentId)
      : root;
    if (!parent) {
      throw new Error(
        "EntityInitializer tried to reference unknown parent entity"
      );
    }
    child.setParent(parent);
  }
};
