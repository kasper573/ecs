import { EditorState } from "../types/EditorState";
import { EditorSelection } from "../types/EditorSelection";
import { resetSelection } from "./resetSelection";

/**
 * Updates the selected index for the specified object type
 * @param state The current state
 * @param objectName The object to change index for
 * @param newIndex The new index
 */
export const setSelection = <K extends keyof EditorSelection>(
  state: EditorState,
  objectName: K,
  newIndex: EditorSelection[K]
): EditorState => {
  const { selection: reset } = resetSelection(state, objectName);
  const selection = {
    ...reset,
    [objectName]: newIndex,
  };
  return {
    ...state,
    selection,
  };
};
