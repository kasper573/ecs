import { System } from "../../ecs/System";
import { Inventory } from "../../ecs-collectable/Inventory";
import { InteractionMemory } from "../../ecs-interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { Entity } from "../../ecs/Entity";
import { SystemDefinition } from "../types/SystemDefinition";
import { EntityConstructorMap } from "../types/EntityConstructorMap";
import { NativeComponents } from "../types/NativeComponents";
import { createEntityInstanceFactory } from "./createEntityInstanceFactory";
import { defineEntities } from "./defineEntities";
import { defineComponents } from "./defineComponents";

/**
 * Creates a System instance for the specified SystemDefinition
 */
export const createSystem = <AvailableComponents extends NativeComponents>(
  systemDefinition: SystemDefinition<AvailableComponents>,
  nativeComponents: AvailableComponents,
  preferredSceneId?: string
): System => {
  const { entities = [], components = [] } = systemDefinition.library;
  const componentConstructors = defineComponents(components, nativeComponents);
  const entityConstructors = defineEntities(entities, componentConstructors);
  const entriesByScene = getEntriesByScene(
    systemDefinition,
    entityConstructors
  );
  const availableSceneIds = Object.keys(entriesByScene);
  const initialSceneId =
    preferredSceneId && availableSceneIds.includes(preferredSceneId)
      ? preferredSceneId
      : availableSceneIds[0];
  const sceneManager = new SceneManager(initialSceneId, entriesByScene);
  const inventory = new Inventory();
  return new System({
    modules: [sceneManager, inventory, new InteractionMemory()],
    entities: () => [...(sceneManager.scene ?? []), ...inventory],
  });
};

const getEntriesByScene = <AvailableComponents extends NativeComponents>(
  systemDefinition: SystemDefinition<AvailableComponents>,
  entityConstructors: EntityConstructorMap
) => {
  return systemDefinition.scenes.reduce((scenes, scene) => {
    const createEntityInstance = createEntityInstanceFactory(
      entityConstructors
    );
    return {
      ...scenes,
      [scene.name]: scene.entities.map(createEntityInstance),
    };
  }, {} as Record<string, Entity[]>);
};
