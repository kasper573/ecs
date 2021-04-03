import { System } from "../../ecs/System";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../types/ECSDefinition";
import { get, set, values } from "../../ecs-common/nominal";
import { DeserializationMemory } from "../DeserializationMemory";
import { EntityInstanceMap } from "../types/EntityInstanceMap";
import { EntityInitializer } from "../types/EntityInitializer";
import { Entity } from "../../ecs/Entity";
import { SceneDefinitionId } from "../types/SceneDefinition";
import { commitEntities } from "./commitEntities";
import { commitComponents } from "./commitComponents";

/**
 * Updates a System instance with the specified ECSDefinition
 */
export const updateSystem = (
  system: System,
  ecs: ECSDefinition,
  nativeComponents: NativeComponents
) => {
  let memory = system.modules.findType(DeserializationMemory);
  if (!memory) {
    memory = new DeserializationMemory();
    system.modules.push(memory);
  }

  commitComponents(values(ecs.componentDefinitions), nativeComponents, memory);

  commitEntities(
    values(ecs.entityDefinitions),
    values(ecs.entityInitializers),
    memory
  );

  const sceneManager = system.modules.resolveType(SceneManager);
  sceneManager.setEntities(
    getEntitiesByScene(values(ecs.entityInitializers), memory.entityInstances)
  );
  for (const sceneDefinition of values(ecs.scenes)) {
    const targetScene = sceneManager.scenes[sceneDefinition.id];
    if (targetScene) {
      targetScene.name = sceneDefinition.name;
    } else {
      console.warn("Could not find scene instance", sceneDefinition.id);
    }
  }
};

const getEntitiesByScene = (
  entityInitializerList: EntityInitializer[],
  entityInstances: EntityInstanceMap
) =>
  entityInitializerList.reduce((entitiesByScene, entityInitializer) => {
    let sceneEntities = get(entitiesByScene, entityInitializer.sceneId);
    if (!sceneEntities) {
      sceneEntities = [];
      set(entitiesByScene, entityInitializer.sceneId, sceneEntities);
    }
    sceneEntities.push(entityInstances.get(entityInitializer.id)!);
    return entitiesByScene;
  }, {} as Record<SceneDefinitionId, Entity[]>);
