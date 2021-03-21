import { EntityConstructorMap } from "../types/EntityConstructorMap";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../types/EntityInitializer";
import { Entity } from "../../ecs/Entity";
import { ComponentMap } from "../types/ComponentMap";
import { EntityDefinition } from "../types/EntityDefinition";
import { initializeEntity } from "./initializeEntity";

/**
 * Creates a factory that produces an Entity instance for each given EntityInitializer.
 */
export const createEntityInstanceFactory = (
  entityDefinitions: EntityDefinition[],
  entityConstructors: EntityConstructorMap,
  componentConstructors: ComponentMap
) => {
  const instances = new Map<EntityInitializerId, Entity>();
  return (initializer: EntityInitializer) => {
    if (instances.has(initializer.id)) {
      throw new Error(
        `Entity instance with id "${initializer.id}" already exists`
      );
    }
    const definition = entityDefinitions.find(
      (def) => def.id === initializer.definitionId
    );
    if (!definition) {
      throw new Error(
        `Could not find entity definition by id: ${initializer.definitionId}`
      );
    }
    const instance = initializeEntity(
      initializer,
      definition,
      entityConstructors,
      componentConstructors
    );
    instances.set(initializer.id, instance);
    return instance;
  };
};

export type EntityInstanceFactory = ReturnType<
  typeof createEntityInstanceFactory
>;
