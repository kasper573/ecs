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
): EditorState => {
  const { objectName, selectedValue } = payload;
  if (selectedValue === undefined) {
    return state;
  }
  const { selection: reset } = resetSelectionReducer(state, objectName);
  const selection = {
    ...reset,
    [objectName]: selectedValue,
  };
  return {
    ...state,
    selection,
  };
};
