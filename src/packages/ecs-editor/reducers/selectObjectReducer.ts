import { EditorState } from "../types/EditorState";
import { EditorSelectionValues } from "../types/EditorSelection";
import { resetSelectionReducer } from "./resetSelectionReducer";

/**
 * Updates the selection for the specified object type
 */
export const selectObjectReducer = <K extends keyof EditorSelectionValues>(
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
  const { selection: reset } = resetSelectionReducer(state, objectName);
  state.selection = {
    ...reset,
    [objectName]: selectedValue,
  };
};
