import { EditorState } from "../types/EditorState";
import { EditorSelectionValues } from "../types/EditorSelection";
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
  const { selection } = resetSelection(state, objectName);
  return {
    ...state,
    selection: {
      ...selection,
      [objectName]: selectedValue,
    },
  };
};
