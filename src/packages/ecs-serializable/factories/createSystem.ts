import { System } from "../../ecs/System";
import { Inventory } from "../../ecs-collectable/Inventory";
import { InteractionMemory } from "../../ecs-interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { NativeComponents } from "../types/NativeComponents";
import { ECSDefinition } from "../types/ECSDefinition";
import { SystemDefinitionId } from "../types/SystemDefinition";
import { SceneDefinitionId } from "../types/SceneDefinition";
import { keys, values } from "../../ecs-common/nominal";
import { getECSDefinitionForSystem } from "../getECSDefinitionForSystem";
import { defineEntities } from "./defineEntities";
import { defineComponents } from "./defineComponents";
import { initializeEntitiesByScene } from "./initializeEntitiesByScene";

/**
 * Creates a System instance for the specified SystemDefinition
 */
export const createSystem = (
  arbitraryECS: ECSDefinition,
  nativeComponents: NativeComponents,
  systemId: SystemDefinitionId = values(arbitraryECS.systems)[0].id,
  preferredSceneId?: SceneDefinitionId
): System => {
  const {
    scenes,
    componentDefinitions,
    entityDefinitions,
    entityInitializers,
  } = getECSDefinitionForSystem(arbitraryECS, systemId);
  const componentConstructors = defineComponents(
    values(componentDefinitions),
    nativeComponents
  );
  const entityConstructors = defineEntities(
    values(entityDefinitions),
    componentConstructors
  );
  const entitiesByScene = initializeEntitiesByScene(
    values(scenes),
    values(entityInitializers),
    values(entityDefinitions),
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
