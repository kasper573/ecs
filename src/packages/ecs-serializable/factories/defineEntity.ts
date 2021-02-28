import { EntityDefinition } from "../types/EntityDefinition";
import { ComponentConstructorMap } from "../types/ComponentConstructorMap";
import { StatefulEntity } from "../../ecs/StatefulEntity";
import { defineComponentOptions } from "./defineComponentOptions";

/**
 * Returns a Entity class representing the specified EntityDefinition.
 */
export const defineEntity = (
  definition: EntityDefinition,
  componentConstructors: ComponentConstructorMap
) => {
  const selectedComponents = definition.components.map((initializer) => {
    const constructor = componentConstructors.get(initializer.definitionId);
    if (!constructor) {
      throw new Error(
        `No Component with definitionId "${initializer.definitionId}" exists`
      );
    }
    return [constructor, initializer.options] as const;
  });
  class DefinedEntity extends StatefulEntity<any> {
    constructor() {
      super(
        {},
        selectedComponents.map(([Component, options]) => {
          const component = new Component();
          if (options) {
            component.options = defineComponentOptions(options);
          }
          return component;
        })
      );
    }
  }
  return DefinedEntity;
};
