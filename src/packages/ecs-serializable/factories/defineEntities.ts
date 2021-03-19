import { EntityConstructorMap } from "../types/EntityConstructorMap";
import { ComponentMap } from "../types/ComponentMap";
import { EntityDefinition } from "../types/EntityDefinition";
import { defineEntity } from "./defineEntity";

/**
 * Returns a EntityConstructorMap representing the
 * specified EntityDefinitions, mapped by definition id.
 */
export const defineEntities = (
  definitions: EntityDefinition[],
  componentConstructors: ComponentMap
) =>
  definitions.reduce((map: EntityConstructorMap, definition) => {
    if (map.has(definition.id)) {
      throw new Error(
        `Entity constructor with id "${definition.id}" already exists`
      );
    }
    return map.set(
      definition.id,
      defineEntity(definition, componentConstructors)
    );
  }, new Map());
