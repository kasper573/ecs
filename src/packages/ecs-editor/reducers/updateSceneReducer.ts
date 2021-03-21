import { EditorStateReducer } from "../types/EditorStateReducer";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateSystemReducer } from "./updateSystemReducer";

export const updateSceneReducer: EditorStateReducer<{
  system?: SystemDefinition;
  scene: SceneDefinition;
  update: Partial<SceneDefinition>;
}> = (state, { system = selectSelectedSystem(state), scene, update }) => {
  if (!system) {
    throw new Error(`System must be specified`);
  }
  const updatedScenes = system.scenes.slice();
  const index = updatedScenes.indexOf(scene);
  if (index === -1) {
    throw new Error(`Scene not found in system`);
  }
  updatedScenes[index] = { ...scene, ...update };
  return updateSystemReducer(state, {
    system,
    update: {
      scenes: updatedScenes,
    },
  });
};
