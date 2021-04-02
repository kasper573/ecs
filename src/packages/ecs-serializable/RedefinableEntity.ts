import { uniq } from "lodash";
import { Entity } from "../ecs/Entity";
import { ComponentInstance } from "../ecs/Component";
import { getPropertyDefaults } from "../property-bag/getPropertyDefaults";
import { createComponentProperties } from "./functions/createComponentProperties";
import { EntityDefinition } from "./types/EntityDefinition";
import { ComponentConstructorMap } from "./types/ComponentConstructorMap";
import { EntityInitializer } from "./types/EntityInitializer";
import { ComponentInitializerId } from "./types/ComponentInitializer";
import { ComponentPropertiesDefinition } from "./types/ComponentPropertiesDefinition";

export class RedefinableEntity extends Entity {
  define(
    componentConstructors: ComponentConstructorMap,
    definition: EntityDefinition,
    initializer: EntityInitializer
  ) {
    this.name = initializer.name;

    const baseInitializers = definition.components;
    const primaryInitializers = initializer.components;
    const initializerIds = uniq([
      ...baseInitializers.map((c) => c.id),
      ...primaryInitializers.map((c) => c.id),
    ]);

    // Remove expired component initializers
    for (const component of this.components) {
      if (!initializerIds.includes(component.id as ComponentInitializerId)) {
        this.components.remove(component);
      }
    }

    // Add or update component initializers
    for (const primary of primaryInitializers) {
      let component:
        | ComponentInstanceWithMemory
        | undefined = this.components.find((comp) => comp.id === primary.id);

      const base = baseInitializers.find((c) => c.id === primary.id);
      const initializer = (primary ?? base)!;

      const Component = componentConstructors.get(initializer.definitionId);
      if (!Component) {
        throw new Error(
          `No Component with definitionId "${initializer.definitionId}" exists`
        );
      }

      if (!component) {
        component = new Component();
        this.components.push(component);
      }

      // Ignore unchanged properties
      const didPropertiesChange =
        base?.properties !== component.__baseProperties ||
        primary.properties !== component.__primaryProperties;
      if (!didPropertiesChange) {
        continue;
      }

      // Apply new properties
      component.__baseProperties = base?.properties;
      component.__primaryProperties = primary.properties;
      component.configure({
        ...getPropertyDefaults(Component.propertyInfos),
        ...(base ? createComponentProperties(base.properties) : undefined),
        ...createComponentProperties(primary.properties),
        id: initializer.id,
      });
    }
  }
}

type ComponentInstanceWithMemory = ComponentInstance & {
  __baseProperties?: ComponentPropertiesDefinition;
  __primaryProperties?: ComponentPropertiesDefinition;
};
