import { EditorState } from "../types/EditorState";
import {
  EditorSelection,
  getEditorSelectionProperty,
} from "../types/EditorSelection";
import { EditorObjects } from "../types/EditorObjects";
import { resetSelection } from "./resetSelection";

/**
 * Updates the selection for the specified object type
 * @param state The current state
 * @param objectName The object to change index for
 * @param selectedObject The new selection
 */
export const selectObject = <K extends keyof EditorSelection>(
  state: EditorState,
  objectName: K,
  selectedObject: EditorObjects[K]
): EditorState => {
  const selectedProp = getEditorSelectionProperty(objectName);
  const selectedValue = selectedObject[selectedProp];
  if (selectedValue === undefined) {
    return state;
  }
  const { selection: reset } = resetSelection(state, objectName);
  const selection = {
    ...reset,
    [objectName]: selectedValue,
  };
  return {
    ...state,
    selection,
  };
};
