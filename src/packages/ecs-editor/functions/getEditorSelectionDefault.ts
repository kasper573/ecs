import { EditorObjectName } from "../types/EditorObjects";
import { EditorState } from "../types/EditorState";
import {
  EditorSelection,
  getEditorSelectionProperty,
} from "../types/EditorSelection";
import { peekEditorObjectList } from "./peekEditorObjectList";

export function getEditorSelectionDefault<ObjectName extends EditorObjectName>(
  state: EditorState,
  objectName: ObjectName
): EditorSelection[ObjectName];

/**
 * Returns the selection for the first object in the list for the specified object.
 * (Returns undefined if the list for the specified object is empty)
 */
export function getEditorSelectionDefault(
  state: EditorState,
  objectName: EditorObjectName
) {
  const selectedObject = peekEditorObjectList(state, objectName);
  const selectionProperty = getEditorSelectionProperty(objectName);
  if (selectedObject) {
    return selectedObject[selectionProperty];
  }
}
