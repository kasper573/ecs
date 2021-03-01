import { editorObjectsOrder } from "../types/EditorObjects";
import { EditorState } from "../types/EditorState";
import { getEditorSelectionDefault } from "../functions/getEditorSelectionDefault";

/**
 * Ensures selection for objects that has a default available.
 * (Returns the original state object if no selection was changed)
 */
export const ensureSelection = (state: EditorState): EditorState => {
  const newSelection = { ...state.selection };
  let didChange = false;
  for (const objectName of editorObjectsOrder) {
    const objectHasSelection = !!state.selection[objectName];
    if (!objectHasSelection) {
      const objectDefault = getEditorSelectionDefault(state, objectName);
      if (objectDefault) {
        newSelection[objectName] = objectDefault;
        didChange = true;
      }
    }
  }
  if (!didChange) {
    return state;
  }
  return { ...state, selection: newSelection };
};
