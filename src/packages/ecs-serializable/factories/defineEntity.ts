import { EntityDefinition } from "../types/EntityDefinition";
import { ComponentMap } from "../types/ComponentMap";
import { Entity } from "../../ecs/Entity";
import { initializeComponents } from "./initializeComponents";

/**
 * Returns a Entity class representing the specified EntityDefinition.
 */
export const defineEntity = (
  definition: EntityDefinition,
  componentConstructors: ComponentMap
) =>
  class DefinedEntity extends Entity {
    constructor() {
      super(initializeComponents(componentConstructors, definition.components));
    }
  };
