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
): void => {
  const { objectName, selectedValue } = payload;
  if (selectedValue === undefined) {
    return; // Nothing selected for this object
  }
  const didChange = state.selection[objectName] !== selectedValue;
  if (!didChange) {
    return; // Same selection
  }
  const { selection: reset } = resetSelection(state, objectName);
  state.selection = {
    ...reset,
    [objectName]: selectedValue,
  };
};
