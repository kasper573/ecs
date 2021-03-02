import { EditorObjectName, EditorObjects } from "../types/EditorObjects";
import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { resetSelectionReducer } from "./resetSelectionReducer";

export type ReactToDeletePayload<K extends EditorObjectName> = {
  /**
   * The state prior to deletion
   */
  previousState: EditorState;
  /**
   * The name of the object type that was deleted
   */
  objectName: K;
  /**
   * The object that was deleted
   */
  deletedObject: EditorObjects[K];
};

/**
 * Resets selection at the level a delete happens if the deleted object was previously selected
 */
export const reactToDeleteReducer = <K extends EditorObjectName>(
  currentState: EditorState,
  { previousState, objectName, deletedObject }: ReactToDeletePayload<K>
) => {
  const selected = selectEditorObjects(previousState);
  if (selected[objectName] === deletedObject) {
    return resetSelectionReducer(currentState, objectName);
  }
  return currentState;
};
