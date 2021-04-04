import { without } from "lodash";
import { SceneDefinition, SceneDefinitionId } from "../types/SceneDefinition";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { keys, remove } from "../../ecs-common/nominal";
import { Scene } from "../../ecs-scene-manager/Scene";

/**
 * Defines and/or removes scene instances
 */
export const commitScenes = (
  definitions: SceneDefinition[],
  manager: SceneManager<SceneDefinitionId>
) => {
  const definedIds = keys(manager.scenes);
  const currentIds = definitions.map((d) => d.id);
  const removedIds = without(definedIds, ...currentIds);
  for (const id of removedIds) {
    remove(manager.scenes, id);
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
