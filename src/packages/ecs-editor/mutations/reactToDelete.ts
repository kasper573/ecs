import { EditorObjects } from "../types/EditorObjects";
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
export const reactToDelete = <K extends keyof EditorObjects>(
  previousState: EditorState,
  currentState: EditorState,
  objectName: K,
  deletedObject: EditorObjects[K]
) => {
  const selected = selectEditorObjects(previousState);
  if (selected[objectName] === deletedObject) {
    return resetSelection(currentState, objectName);
  }
  return currentState;
};
