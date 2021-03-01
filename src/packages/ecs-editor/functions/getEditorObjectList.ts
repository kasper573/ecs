import { EditorState } from "../types/EditorState";
import { EditorObjectName, EditorObjects } from "../types/EditorObjects";
import { selectEditorObjects } from "./selectEditorObjects";

/**
 * Gets the list of instances for the specified object
 */
export const getEditorObjectList = <ObjectName extends EditorObjectName>(
  state: EditorState,
  objectName: ObjectName
): EditorObjectArrays[ObjectName] => {
  const selection = selectEditorObjects(state);
  switch (objectName) {
    case "system":
      return state.systems as EditorObjectArrays[ObjectName];
    case "scene":
      return (selection.system?.scenes ?? []) as EditorObjectArrays[ObjectName];
    case "entityInitializer":
      return (selection.scene?.entities ??
        []) as EditorObjectArrays[ObjectName];
    case "entityDefinition":
      return (selection.system?.library.entities ??
        []) as EditorObjectArrays[ObjectName];
    case "componentDefinition":
      return (selection.system?.library.components ??
        []) as EditorObjectArrays[ObjectName];
  }
  return [];
};

type EditorObjectArrays = {
  [ObjectName in EditorObjectName]: EditorObjects[ObjectName][];
};
