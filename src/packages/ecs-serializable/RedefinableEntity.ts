import { uniq } from "lodash";
import { Entity } from "../ecs/Entity";
import { keys } from "../ecs-common/nominal";
import { EntityDefinition } from "./types/EntityDefinition";
import { EntityInitializer } from "./types/EntityInitializer";
import { ComponentInitializerId } from "./types/ComponentInitializer";
import { DeserializationMemory } from "./DeserializationMemory";
import { createComponentProperty } from "./functions/createComponentProperty";

export class RedefinableEntity extends Entity {
  define(
    definition: EntityDefinition,
    initializer: EntityInitializer,
    memory: DeserializationMemory
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
      const id = component.id as ComponentInitializerId;
      if (!initializerIds.includes(id)) {
        this.components.remove(component);
        memory.componentProperties.delete(id);
      }
    }

    // Add or update component initializers
    for (const initializerId of initializerIds) {
      const primary = primaryInitializers.find((i) => i.id === initializerId);
      const base = baseInitializers.find((i) => i.id === initializerId);
      const initializer = (primary ?? base)!;

      let component = this.components.find((comp) => comp.id === initializerId);

      const Component = memory.componentConstructors.get(
        initializer.definitionId
      );
      if (!Component) {
        throw new Error(
          `No Component with definitionId "${initializer.definitionId}" exists`
        );
      }

      // Instantiate component
      if (!component) {
        component = new Component();
        component.configure({ id: initializer.id });
        this.components.push(component);
      }

      // Determine which properties have been changed
      const allPropertyNames = keys(Component.propertyInfos);
      const pm = memory.componentProperties.get(initializer.id) ?? {};
      for (const propertyName of allPropertyNames) {
        const oldBaseValue = pm.base && pm.base[propertyName];
        const oldPrimaryValue = pm.primary && pm.primary[propertyName];
        const newBaseValue = base ? base.properties[propertyName] : undefined;
        const newPrimaryValue = primary
          ? primary.properties[propertyName]
          : undefined;
        if (
          newBaseValue !== oldBaseValue ||
          newPrimaryValue !== oldPrimaryValue
        ) {
          if (primary?.properties.hasOwnProperty(propertyName)) {
            // New primary value
            component.configure({
              [propertyName]: createComponentProperty(newPrimaryValue),
            });
          } else if (base?.properties.hasOwnProperty(propertyName)) {
            // New base value
            component.configure({
              [propertyName]: createComponentProperty(newBaseValue),
            });
          } else {
            // Primary and base have both been removed, reset to default
            component.reset(propertyName);
          }
        }
      }

      // Memorize new properties for comparison next update
      memory.componentProperties.set(initializer.id, {
        base: base?.properties,
        primary: primary?.properties,
      });
    }
  }
}
