import { EditorState } from "../types/EditorState";
import {
  EditorSelection,
  getEditorSelectionProperty,
} from "../types/EditorSelection";
import { EditorObjects } from "../types/EditorObjects";
import { resetSelectionReducer } from "./resetSelectionReducer";

/**
 * Updates the selection for the specified object type
 */
export const selectObjectReducer = <K extends keyof EditorSelection>(
  state: EditorState,
  payload: {
    objectName: K;
    selectedObject: EditorObjects[K];
  }
): EditorState => {
  const { objectName, selectedObject } = payload;
  const selectedProp = getEditorSelectionProperty(objectName);
  const selectedValue = selectedObject[selectedProp];
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
