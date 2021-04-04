import { EditorState } from "../types/EditorState";
import {
  EditorSelectionName,
  EditorSelectionValues,
} from "../types/EditorSelection";

export function getDefaultSelectionValue<
  ObjectName extends EditorSelectionName
>(
  state: EditorState,
  objectName: ObjectName
): EditorSelectionValues[ObjectName];

/**
 * Returns the selection for the first object in the list for the specified object.
 * (Returns undefined if the list for the specified object is empty)
 */
export function getDefaultSelectionValue(
  state: EditorState,
  objectName: EditorSelectionName
): EditorSelectionValues[EditorSelectionName] {
  switch (objectName) {
    case "system":
      const firstSystem = Object.values(state.ecs.systems)[0];
      return firstSystem?.id;
    case "scene":
      const scene = Object.values(state.ecs.scenes).find(
        (scene) => scene.systemId === state.selection.system
      );
      return scene && scene.id;
  }
}
