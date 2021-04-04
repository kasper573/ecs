import { System } from "../../ecs/System";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../types/ECSDefinition";
import { DeserializationMemory } from "../DeserializationMemory";
import { EntityInstanceMap } from "../types/EntityInstanceMap";
import { EntityInitializer } from "../types/EntityInitializer";
import { Entity } from "../../ecs/Entity";
import { SceneDefinitionId } from "../types/SceneDefinition";
import { commitEntities } from "./commitEntities";
import { commitComponents } from "./commitComponents";
import { commitScenes } from "./commitScenes";

/**
 * Updates a System instance with the specified ECSDefinition
 */
export const updateSystem = (
  system: System,
  ecs: ECSDefinition,
  memory: DeserializationMemory,
  nativeComponents: NativeComponents
) => {
  commitComponents(
    Object.values(ecs.componentDefinitions),
    nativeComponents,
    memory
  );

  commitEntities(
    Object.values(ecs.entityDefinitions),
    Object.values(ecs.entityInitializers),
    memory
  );

  const sceneManager = system.modules.resolveType(SceneManager);
  commitScenes(Object.values(ecs.scenes), sceneManager);
  sceneManager.setEntities(
    getEntityInstancesByScene(
      Object.values(ecs.entityInitializers),
      memory.entityInstances
    )
  );
};

const getEntityInstancesByScene = (
  entityInitializerList: EntityInitializer[],
  entityInstances: EntityInstanceMap
) =>
  entityInitializerList.reduce((entitiesByScene, entityInitializer) => {
    let sceneEntities = entitiesByScene[entityInitializer.sceneId];
    if (!sceneEntities) {
      sceneEntities = [];
      entitiesByScene[entityInitializer.sceneId] = sceneEntities;
    }
    sceneEntities.push(entityInstances.get(entityInitializer.id)!);
    return entitiesByScene;
  }, {} as Record<SceneDefinitionId, Entity[]>);
