import { SceneDefinition, SceneDefinitionId } from "../types/SceneDefinition";
import { EntityConstructorMap } from "../types/EntityConstructorMap";
import { Entity } from "../../ecs/Entity";
import { EntityDefinition } from "../types/EntityDefinition";
import { ComponentMap } from "../types/ComponentMap";
import { EntityInitializer } from "../types/EntityInitializer";
import { set } from "../../ecs-common/nominal";
import { createEntityInstanceFactory } from "./createEntityInstanceFactory";

/**
 * Instantiates scene entities within the same scope.
 * (Meaning that if duplicate identifiers occur an error will be thrown).
 */
export const initializeEntitiesByScene = (
  scenes: SceneDefinition[],
  entityInitializers: EntityInitializer[],
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
    return set(
      scenes,
      scene.id,
      entityInitializers
        .filter((init) => init.sceneId === scene.id)
        .map(createEntityInstance)
    );
  }, {} as Record<SceneDefinitionId, Entity[]>);
