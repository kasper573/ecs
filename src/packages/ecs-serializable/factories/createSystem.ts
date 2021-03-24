import { System } from "../../ecs/System";
import { Inventory } from "../../ecs-collectable/Inventory";
import { InteractionMemory } from "../../ecs-interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { NativeComponents } from "../types/NativeComponents";
import { getDefinitionsInLibrary } from "../functions/getDefinitionsInLibrary";
import { SerializableECS } from "../types/SerializableECS";
import { SystemDefinitionId } from "../types/SystemDefinition";
import { SceneDefinitionId } from "../types/SceneDefinition";
import { keys, values } from "../../nominal";
import { defineEntities } from "./defineEntities";
import { defineComponents } from "./defineComponents";
import { initializeEntitiesByScene } from "./initializeEntitiesByScene";

/**
 * Creates a System instance for the specified SystemDefinition
 */
export const createSystem = (
  ecs: SerializableECS,
  nativeComponents: NativeComponents,
  systemId: SystemDefinitionId = values(ecs.systems)[0].id,
  preferredSceneId?: SceneDefinitionId
): System => {
  const systemLibrary = values(ecs.library).filter(
    (node) => node.systemId === systemId
  );
  const systemScenes = values(ecs.scenes).filter(
    (scene) => scene.systemId === systemId
  );
  const { entities, components } = getDefinitionsInLibrary(systemLibrary);
  const componentConstructors = defineComponents(
    values(components),
    nativeComponents
  );
  const entityConstructors = defineEntities(
    values(entities),
    componentConstructors
  );
  const entitiesByScene = initializeEntitiesByScene(
    systemScenes,
    values(ecs.entities),
    values(entities),
    entityConstructors,
    componentConstructors
  );
  const availableSceneIds = keys(entitiesByScene);
  const initialSceneId =
    preferredSceneId && availableSceneIds.includes(preferredSceneId)
      ? preferredSceneId
      : availableSceneIds[0];
  const sceneManager = new SceneManager(initialSceneId, entitiesByScene);
  const inventory = new Inventory();
  return new System({
    modules: [sceneManager, inventory, new InteractionMemory()],
    entities: () => [...(sceneManager.scene ?? []), ...inventory],
  });
};
