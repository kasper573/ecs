import { EditorState } from "../types/EditorState";
import {
  editorSelectionOrder,
  EditorSelectionValues,
} from "../types/EditorSelection";
import { resetSelection } from "./resetSelection";

/**
 * Updates the selection for the specified object type
 */
export const setSelectedObject = <K extends keyof EditorSelectionValues>(
  state: EditorState,
  payload: {
    objectName: K;
    selectedValue: EditorSelectionValues[K];
  }
): EditorState => {
  const { objectName, selectedValue } = payload;
  if (selectedValue === undefined) {
    return state; // Nothing selected for this object
  }
  const didChange = state.selection[objectName] !== selectedValue;
  if (!didChange) {
    return state; // Same selection
  }

  // Apply selection
  const updatedState: EditorState = {
    ...state,
    selection: {
      ...state.selection,
      [objectName]: selectedValue,
    },
  };

  // Reset selection for objects below the selected object
  const nextObjectName =
    editorSelectionOrder[editorSelectionOrder.indexOf(objectName) + 1];
  if (nextObjectName) {
    return resetSelection(updatedState, nextObjectName);
  }

  // Selected the deepest object, no need to reset
  return updatedState;
};
