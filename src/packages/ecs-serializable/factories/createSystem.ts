import { System } from "../../ecs/System";
import { Inventory } from "../../ecs-collectable/Inventory";
import { InteractionMemory } from "../../ecs-interactive/InteractionMemory";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { SystemDefinition } from "../types/SystemDefinition";
import { NativeComponents } from "../types/NativeComponents";
import { getDefinitionsInLibrary } from "../functions/getDefinitionsInLibrary";
import { defineEntities } from "./defineEntities";
import { defineComponents } from "./defineComponents";
import { createEntityInstancesByScene } from "./createEntityInstancesByScene";

/**
 * Creates a System instance for the specified SystemDefinition
 */
export const createSystem = (
  systemDefinition: SystemDefinition,
  nativeComponents: NativeComponents,
  preferredSceneId?: string
): System => {
  const { entities, components } = getDefinitionsInLibrary(
    systemDefinition.library
  );
  const componentConstructors = defineComponents(components, nativeComponents);
  const entityConstructors = defineEntities(entities, componentConstructors);
  const entriesByScene = createEntityInstancesByScene(
    systemDefinition.scenes,
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
