import { EditorState } from "../types/EditorState";
import { EditorObjectName, EditorObjects } from "../types/EditorObjects";
import { selectEditorObjects } from "./selectEditorObjects";

/**
 * Overload to change return type based on generic type argument to an array of the specified object type
 */
export function getEditorObjectList<ObjectName extends EditorObjectName>(
  state: EditorState,
  objectName: ObjectName
): EditorObjectArrays[ObjectName];

/**
 * Gets the list of instances for the specified object
 */
export function getEditorObjectList(
  state: EditorState,
  objectName: EditorObjectName
): EditorObjectArrays[EditorObjectName] {
  const selection = selectEditorObjects(state);
  switch (objectName) {
    case "system":
      return state.systems;
    case "scene":
      return selection.system?.scenes ?? [];
    case "entityInitializer":
      return selection.scene?.entities ?? [];
    case "entityDefinition":
      return selection.system?.library.entities ?? [];
    case "componentDefinition":
      return selection.system?.library.components ?? [];
  }
  return [];
}

type EditorObjectArrays = {
  [ObjectName in EditorObjectName]: EditorObjects[ObjectName][];
};
