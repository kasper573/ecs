import { EditorState } from "../types/EditorState";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import {
  EditorSelectionName,
  EditorSelectionObjects,
} from "../types/EditorSelection";
import { resetSelectionReducer } from "./resetSelectionReducer";

export type ReactToDeletePayload<K extends EditorSelectionName> = {
  /**
   * The state prior to deletion
   */
  previousState: EditorState;
  /**
   * The name of the object type that was deleted
   */
  objectName: K;
  /**
   * Should return true when the selected object for the given object type was deleted
   */
  didDelete: (selectedObject: EditorSelectionObjects[K]) => boolean;
};

/**
 * Resets selection at the level a delete happens if the deleted object was previously selected
 */
export const reactToDeleteReducer = <K extends EditorSelectionName>(
  currentState: EditorState,
  { previousState, objectName, didDelete }: ReactToDeletePayload<K>
) => {
  const selected = selectSelectedObjects(previousState);
  if (didDelete(selected[objectName])) {
    return resetSelectionReducer(currentState, objectName);
  }
  return currentState;
};
