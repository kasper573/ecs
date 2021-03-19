import { EntityDefinition } from "../types/EntityDefinition";
import { ComponentMap } from "../types/ComponentMap";
import { Entity } from "../../ecs/Entity";
import { createComponentProperties } from "./createComponentProperties";

/**
 * Returns a Entity class representing the specified EntityDefinition.
 */
export const defineEntity = (
  definition: EntityDefinition,
  componentConstructors: ComponentMap
) => {
  const selectedComponents = definition.components.map((initializer) => {
    const constructor = componentConstructors.get(initializer.definitionId);
    if (!constructor) {
      throw new Error(
        `No Component with definitionId "${initializer.definitionId}" exists`
      );
    }
    return [constructor, initializer.properties] as const;
  });
  class DefinedEntity extends Entity {
    constructor() {
      super(
        selectedComponents.map(([Component, props]) => {
          const component = new Component();
          if (props) {
            component.configure(createComponentProperties(props));
          }
          return component;
        })
      );
    }
  }
  return DefinedEntity;
};
