import { EditorState } from "../types/EditorState";
import { selectInspectedObject } from "./selectInspectedObject";

export const selectSelectedLibraryNode = (state: EditorState) => {
  const inspected = selectInspectedObject(state);
  return inspected?.type === "libraryNode" ? inspected.object : undefined;
};
