import { EditorState } from "../EditorState";
import { SerializableScene } from "../persisted/SerializableScene";
import { selectEditorObjects } from "../selectEditorObjects";
import { updateSystem } from "./updateSystem";

/**
 * Update the specified scene with a partial update
 */
export const updateScene = (
  state: EditorState,
  scene: SerializableScene,
  update: Partial<SerializableScene>
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
