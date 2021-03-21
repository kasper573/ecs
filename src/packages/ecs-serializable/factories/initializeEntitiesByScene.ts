import { SceneDefinition } from "../types/SceneDefinition";
import { EntityConstructorMap } from "../types/EntityConstructorMap";
import { Entity } from "../../ecs/Entity";
import { EntityDefinition } from "../types/EntityDefinition";
import { ComponentMap } from "../types/ComponentMap";
import { createEntityInstanceFactory } from "./createEntityInstanceFactory";

/**
 * Instantiates scene entities within the same scope.
 * (Meaning that if duplicate identifiers occur an error will be thrown).
 */
export const initializeEntitiesByScene = (
  scenes: SceneDefinition[],
  entityDefinitions: EntityDefinition[],
  entityConstructors: EntityConstructorMap,
  componentConstructors: ComponentMap
) =>
  scenes.reduce((scenes, scene) => {
    const createEntityInstance = createEntityInstanceFactory(
      entityDefinitions,
      entityConstructors,
      componentConstructors
    );
    return {
      ...scenes,
      [scene.name]: scene.entities.map(createEntityInstance),
    };
  }, {} as Record<string, Entity[]>);
