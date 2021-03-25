import { selectDefaultSelectionValue } from "../selectors/selectDefaultSelectionValue";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import {
  EditorSelectionName,
  editorSelectionOrder,
} from "../types/EditorSelection";
import { EditorState } from "../types/EditorState";
import { setSelectedObject } from "./setSelectedObject";

/**
 * Ensures selection for objects that has a default available.
 * (Returns the original state object if no selection was changed)
 */
export const ensureSelection = (state: EditorState): EditorState =>
  editorSelectionOrder.reduce(
    <ObjectName extends EditorSelectionName>(
      state: EditorState,
      objectName: ObjectName
    ) => {
      const selected = selectSelectedObjects(state);
      const objectForSelection = selected[objectName];
      if (objectForSelection) {
        return state; // Current selection is valid, resolves to an object
      }
      return setSelectedObject(state, {
        objectName,
        selectedValue: selectDefaultSelectionValue(state, objectName),
      });
    },
    state
  );
