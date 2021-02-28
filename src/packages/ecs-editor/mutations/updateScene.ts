import { EditorState } from "../types/EditorState";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { updateSystem } from "./updateSystem";

/**
 * Update the specified scene with a partial update
 */
export const updateScene = (
  state: EditorState,
  scene: SceneDefinition,
  update: Partial<SceneDefinition>
): EditorState => {
  const { system } = selectEditorObjects(state);
  if (!system) {
    return state;
  }
  const updatedScenes = system.scenes.slice();
  const index = updatedScenes.indexOf(scene);
  updatedScenes[index] = { ...scene, ...update };
  return updateSystem(state, system, {
    scenes: updatedScenes,
  });
};
