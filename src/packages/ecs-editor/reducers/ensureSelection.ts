import { selectDefaultSelectionValue } from "../selectors/selectDefaultSelectionValue";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import {
  EditorSelectionName,
  editorSelectionOrder,
} from "../types/EditorSelection";
import { EditorState } from "../types/EditorState";
import { filterUntilNoChange } from "../functions/filterUntilNoChange";

/**
 * Ensures selection for objects that has a default available.
 * (Returns the original state object if no selection was changed)
 */
export const ensureSelection = (state: EditorState): EditorState =>
  filterUntilNoChange(ensureSelectionOnce, state);

const ensureSelectionOnce = (state: EditorState): EditorState => {
  const newSelection = { ...state.selection };
  const selected = selectSelectedObjects(state);
  let didChange = false;
  editorSelectionOrder.forEach(
    <ObjectName extends EditorSelectionName>(objectName: ObjectName) => {
      const objectForSelection = selected[objectName];
      if (objectForSelection) {
        return; // Current selection is valid, resolves to an object
      }
      const defaultSelection = selectDefaultSelectionValue(state, objectName);
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
