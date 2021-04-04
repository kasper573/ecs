import { without } from "lodash";
import { SceneDefinition, SceneDefinitionId } from "../types/SceneDefinition";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { removeNominal } from "../../ecs-common/removeNominal";
import { Scene } from "../../ecs-scene-manager/Scene";
import { typedKeys } from "../../ecs-common/typedKeys";

/**
 * Defines and/or removes scene instances
 */
export const commitScenes = (
  definitions: SceneDefinition[],
  manager: SceneManager<SceneDefinitionId>
) => {
  const definedIds = typedKeys(manager.scenes);
  const currentIds = definitions.map((d) => d.id);
  const removedIds = without(definedIds, ...currentIds);
  for (const id of removedIds) {
    removeNominal(manager.scenes, id);
  }
  for (const definition of definitions) {
    let scene = manager.scenes[definition.id];
    if (!scene) {
      scene = new Scene();
      manager.scenes[definition.id] = scene;
    }
    scene.name = definition.name;
  }
};