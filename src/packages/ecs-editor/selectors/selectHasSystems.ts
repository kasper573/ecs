import { EditorState } from "../types/EditorState";
import { selectListOfSystemDefinition } from "./selectListOfSystemDefinition";

export const selectHasSystems = (state: EditorState) =>
  selectListOfSystemDefinition(state).length > 0;
