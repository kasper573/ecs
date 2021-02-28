import { EditorState } from "../types/EditorState";
import { EditorSelection } from "../types/EditorSelection";
import { resetSelection } from "./resetSelection";

/**
 * Updates the selected index for the specified object type
 * @param state The current state
 * @param objectName The object to change index for
 * @param index The new index
 */
export const selectObject = <K extends keyof EditorSelection>(
  state: EditorState,
  objectName: K,
  index: EditorSelection[K] | undefined
): EditorState => {
  if (index === undefined || index === -1) {
    return state;
  }
  const { selection: reset } = resetSelection(state, objectName);
  const selection = {
    ...reset,
    [objectName]: index,
  };
  return {
    ...state,
    selection,
  };
};
