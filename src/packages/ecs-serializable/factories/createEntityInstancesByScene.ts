import { SceneDefinition } from "../types/SceneDefinition";
import { EntityConstructorMap } from "../types/EntityConstructorMap";
import { Entity } from "../../ecs/Entity";
import { createEntityInstanceFactory } from "./createEntityInstanceFactory";

/**
 * Instantiates scene entities within the same scope.
 * (Meaning that if duplicate identifiers occur an error will be thrown).
 */
export const createEntityInstancesByScene = (
  scenes: SceneDefinition[],
  entityConstructors: EntityConstructorMap
) =>
  scenes.reduce((scenes, scene) => {
    const createEntityInstance = createEntityInstanceFactory(
      entityConstructors
    );
    return {
      ...scenes,
      [scene.name]: scene.entities.map(createEntityInstance),
    };
  }, {} as Record<string, Entity[]>);