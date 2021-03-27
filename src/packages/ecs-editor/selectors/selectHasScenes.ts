import { EditorState } from "../types/EditorState";
import { selectListOfSceneDefinition } from "./selectListOfSceneDefinition";

export const selectHasScenes = (
  state: EditorState,
  forSystemId = state.selection.system
) => selectListOfSceneDefinition(state, forSystemId).length > 0;
