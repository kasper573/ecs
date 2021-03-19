import { EditorState } from "../types/EditorState";
import { selectSelectedSystem } from "./selectSelectedSystem";

export const selectSelectedScene = (
  state: EditorState,
  selectedSystem = selectSelectedSystem(state)
) => selectedSystem?.scenes.find((scene) => scene.id === state.selection.scene);
