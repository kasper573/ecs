import { EditorState } from "../types/EditorState";
import { EditorObjectName, EditorObjects } from "../types/EditorObjects";
import { selectEditorObjects } from "./selectEditorObjects";

/**
 * Overload to change return type based on generic type argument to an array of the specified object type
 */
export function peekEditorObjectList<ObjectName extends EditorObjectName>(
  state: EditorState,
  objectName: ObjectName
): EditorObjects[ObjectName];

/**
 * Gets the first selectable item for the specified object
 */
export function peekEditorObjectList(
  state: EditorState,
  objectName: EditorObjectName
): EditorObjects[EditorObjectName] | undefined {
  const selected = selectEditorObjects(state);
  switch (objectName) {
    case "system":
      return state.systems[0];
    case "scene":
      return selected.system?.scenes[0];
    case "libraryNode":
      return selected.system?.library.find((node) => node.type !== "folder");
  }
}
