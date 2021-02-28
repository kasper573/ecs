import { EntityConstructorMap } from "../types/EntityConstructorMap";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../types/EntityInitializer";
import { Entity } from "../../ecs/Entity";
import { createEntity } from "./createEntity";

/**
 * Creates a factory that produces an Entity instance for each given EntityInitializer.
 */
export const createEntityInstanceFactory = (
  constructors: EntityConstructorMap
) => {
  const instances = new Map<EntityInitializerId, Entity>();
  return (initializer: EntityInitializer) => {
    if (instances.has(initializer.id)) {
      throw new Error(
        `Entity instance with id "${initializer.id}" already exists`
      );
    }
    const instance = createEntity(initializer, constructors);
    instances.set(initializer.id, instance);
    return instance;
  };
};

export type EntityInstanceFactory = ReturnType<
  typeof createEntityInstanceFactory
>;
