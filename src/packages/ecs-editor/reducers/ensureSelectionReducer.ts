import { EditorObjectName, editorObjectsOrder } from "../types/EditorObjects";
import { getEditorSelectionDefault } from "../functions/getEditorSelectionDefault";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../functions/selectEditorObjects";

/**
 * Ensures selection for objects that has a default available.
 * (Returns the original state object if no selection was changed)
 */
export const ensureSelectionReducer: EditorStateReducer<void> = (state) => {
  const newSelection = { ...state.selection };
  const selected = selectEditorObjects(state);
  let didChange = false;
  editorObjectsOrder.forEach(
    <ObjectName extends EditorObjectName>(objectName: ObjectName) => {
      const objectHasSelection = !!selected[objectName];
      if (!objectHasSelection) {
        newSelection[objectName] = getEditorSelectionDefault(state, objectName);
        didChange = true;
      }
    }
  );
  if (!didChange) {
    return state;
  }
  return { ...state, selection: newSelection };
};
