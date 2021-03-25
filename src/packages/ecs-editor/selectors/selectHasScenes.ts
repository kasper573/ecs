import { EditorState } from "../types/EditorState";
import { selectListOfSceneDefinition } from "./selectListOfSceneDefinition";

export const selectHasScenes = (state: EditorState) =>
  selectListOfSceneDefinition(state).length > 0;
