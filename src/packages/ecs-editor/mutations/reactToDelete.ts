import { EditorSelectionObjects } from "../types/EditorSelectionObjects";
import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { resetSelection } from "./resetSelection";

/**
 * Resets selection at the level a delete happens if the deleted object was previously selected
 * @param previousState The state prior to deletion
 * @param currentState The state after deletion
 * @param objectName The name of the object type that was deleted
 * @param deletedObject The object that was deleted
 */
export const reactToDelete = <K extends keyof EditorSelectionObjects>(
  previousState: EditorState,
  currentState: EditorState,
  objectName: K,
  deletedObject: EditorSelectionObjects[K]
) => {
  const selected = selectEditorObjects(previousState);
  if (selected[objectName] === deletedObject) {
    return resetSelection(currentState, objectName);
  }
  return currentState;
};
