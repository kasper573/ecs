import { EditorState } from "../types/EditorState";
import { EditorSelection } from "../types/EditorSelection";
import { editorObjectsOrder } from "../types/EditorObjects";

/**
 * Reset index to 0 for the specified object and all child objects
 */
export const resetSelection = <K extends keyof EditorSelection>(
  state: EditorState,
  objectName: K
): EditorState => {
  const newSelection = { ...state.selection };
  for (
    let startIndex = editorObjectsOrder.indexOf(objectName);
    startIndex < editorObjectsOrder.length;
    startIndex++
  ) {
    newSelection[editorObjectsOrder[startIndex]] = 0;
  }
  return {
    ...state,
    selection: newSelection,
  };
};
