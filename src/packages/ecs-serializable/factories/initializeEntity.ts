import { without } from "lodash";
import { EntityInitializer } from "../types/EntityInitializer";
import { EntityConstructorMap } from "../types/EntityConstructorMap";
import { EntityDefinition } from "../types/EntityDefinition";
import { ComponentMap } from "../types/ComponentMap";
import { createComponentProperties } from "./createComponentProperties";
import { initializeComponents } from "./initializeComponents";

/**
 * Creates an Entity instance for the specified EntityInitializer
 */
export const initializeEntity = (
  initializer: EntityInitializer,
  definition: EntityDefinition,
  entityConstructors: EntityConstructorMap,
  componentConstructors: ComponentMap
) => {
  const DefinedEntity = entityConstructors.get(initializer.definitionId);
  if (!DefinedEntity) {
    throw new Error(
      `Could not find entity constructor by id: ${initializer.definitionId}`
    );
  }

  // Instantiate entity
  const entity = new DefinedEntity();
  entity.name = initializer.name;

  // Determine component difference between initializer and definition
  const initializerIds = initializer.components.map(({ id }) => id);
  const definitionIds = definition.components.map(({ id }) => id);
  const removedIds = without(definitionIds, ...initializerIds);
  const addedIds = without(initializerIds, ...definitionIds);

  // Remove components that shouldn't be on instance
  for (const id of removedIds) {
    entity.components.remove(entity.components.find((comp) => comp.id === id)!);
  }

  // Add components unique for instance
  const added = initializer.components.filter(({ id }) =>
    addedIds.includes(id)
  );
  entity.components.push(...initializeComponents(componentConstructors, added));

  // Override properties in existing components
  for (const { id, properties } of initializer.components) {
    const component = entity.components.find((comp) => comp.id === id);
    if (component) {
      component.configure(createComponentProperties(properties));
    }
  }
  return entity;
};
