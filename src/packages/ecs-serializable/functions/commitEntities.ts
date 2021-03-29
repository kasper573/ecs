import { uniq } from "lodash";
import { without } from "lodash";
import { EntityConstructorMap } from "../types/EntityConstructorMap";
import { ComponentMap } from "../types/ComponentMap";
import { EntityDefinition } from "../types/EntityDefinition";
import { EntityInstanceMap } from "../types/EntityInstanceMap";
import { EntityInitializer } from "../types/EntityInitializer";
import { defineEntity } from "./defineEntity";

/**
 * Removes, defines, initializes and/or updates entity constructors and instances
 */
export const commitEntities = (
  definitions: EntityDefinition[],
  initializers: EntityInitializer[],
  componentConstructors: ComponentMap,
  entityConstructors: EntityConstructorMap,
  entityInstances: EntityInstanceMap
) => {
  const allDefinitionIds = uniq([
    ...definitions.map((d) => d.id),
    ...initializers.map((i) => i.definitionId),
  ]);

  // Remove expired entity constructors
  const currentDefinitionIds = Array.from(entityConstructors.keys());
  const removedDefinitionIds = without(
    currentDefinitionIds,
    ...allDefinitionIds
  );
  for (const id of removedDefinitionIds) {
    if (entityConstructors.has(id)) {
      entityConstructors.delete(id);
    }
  }

  // Remove expired entity instances
  const initializerIds = initializers.map((i) => i.id);
  const currentInstanceIds = Array.from(entityInstances.keys());
  const removedInstanceIds = without(currentInstanceIds, ...initializerIds);
  for (const id of removedInstanceIds) {
    if (entityInstances.has(id)) {
      entityInstances.delete(id);
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

    let DefinedEntity = entityConstructors.get(definition.id);
    if (!DefinedEntity) {
      DefinedEntity = defineEntity(definition);
      entityConstructors.set(definition.id, DefinedEntity);
    }
  }

  // Define new or redefine existing entity instances
  for (const init of initializers) {
    let entity = entityInstances.get(init.id);
    const definition = definitions.find((def) => def.id === init.definitionId)!;
    const DefinedEntity = entityConstructors.get(init.definitionId)!;
    if (!entity) {
      entity = new DefinedEntity();
      entityInstances.set(init.id, entity);
    }
    entity.define(componentConstructors, definition, init);
  }
};
