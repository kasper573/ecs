import { EditorState } from "../types/EditorState";

export const selectSelectedSystem = (state: EditorState) =>
  state.systems.find((system) => system.id === state.selection.system);
