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
      const objectForSelection = selected[objectName];
      if (objectForSelection) {
        return; // Current selection is valid, resolves to an object
      }
      const defaultSelection = getEditorSelectionDefault(state, objectName);
      const currentSelection = newSelection[objectName];
      if (currentSelection === defaultSelection) {
        // Current selection is already the default value,
        // which means it's an invalid selection and we can't ensure any further
        return;
      }
      // Current selection was invalid, resetting to default selection
      newSelection[objectName] = defaultSelection;
      didChange = true;
    }
  );
  if (!didChange) {
    return state;
  }
  return { ...state, selection: newSelection };
};
