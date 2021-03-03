import { EditorObjectName } from "../types/EditorObjects";
import { EditorState } from "../types/EditorState";
import { getEditorSelectionProperty } from "../types/EditorSelection";
import { peekEditorObjectList } from "./peekEditorObjectList";

/**
 * Returns the selection for the first object in the list for the specified object.
 * (Returns undefined if the list for the specified object is empty)
 */
export const getEditorSelectionDefault = <ObjectName extends EditorObjectName>(
  state: EditorState,
  objectName: ObjectName
) => {
  const selectedObject = peekEditorObjectList(state, objectName);
  const selectionProperty = getEditorSelectionProperty(objectName);
  if (selectedObject) {
    return selectedObject[selectionProperty];
  }
};
