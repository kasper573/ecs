import { EditorState } from "../types/EditorState";
import {
  EditorSelectionName,
  EditorSelectionValues,
} from "../types/EditorSelection";
import { selectSelectedSystem } from "./selectSelectedSystem";

export function selectDefaultSelectionValue<
  ObjectName extends EditorSelectionName
>(
  state: EditorState,
  objectName: ObjectName
): EditorSelectionValues[ObjectName];

/**
 * Returns the selection for the first object in the list for the specified object.
 * (Returns undefined if the list for the specified object is empty)
 */
export function selectDefaultSelectionValue(
  state: EditorState,
  objectName: EditorSelectionName
): EditorSelectionValues[EditorSelectionName] {
  switch (objectName) {
    case "system":
      const firstSystem = state.systems[0];
      return firstSystem?.id;
    case "scene":
      const selectedSystem = selectSelectedSystem(state);
      const scene = selectedSystem?.scenes[0];
      return scene && scene.id;
    case "inspected":
      // Reset inspection when selecting a non-inspector object
      return undefined;
  }
}
