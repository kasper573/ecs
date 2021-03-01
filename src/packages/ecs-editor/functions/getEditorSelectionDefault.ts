import { EditorObjectName, EditorObjects } from "../types/EditorObjects";
import { EditorState } from "../types/EditorState";
import { getEditorSelectionProperty } from "../types/EditorSelection";
import { getEditorObjectList } from "./getEditorObjectList";

/**
 * Returns the selection for the first object in the list for the specified object.
 * (Returns undefined if the list for the specified object is empty)
 */
export const getEditorSelectionDefault = <ObjectName extends EditorObjectName>(
  state: EditorState,
  objectName: ObjectName
) => {
  const objectList = getEditorObjectList(
    state,
    objectName
  ) as EditorObjects[ObjectName][];
  const selectionProperty = getEditorSelectionProperty(objectName);
  const selectedObject = objectList[0];
  if (selectedObject) {
    return selectedObject[selectionProperty];
  }
};
