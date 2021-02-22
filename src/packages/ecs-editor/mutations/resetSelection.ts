import { EditorState } from "../types/EditorState";
import { EditorSelection } from "../types/EditorSelection";
import { EditorSelectionObjects } from "../types/EditorSelectionObjects";

/**
 * Reset index to 0 for the specified object and all child objects
 */
export const resetSelection = <K extends keyof EditorSelection>(
  state: EditorState,
  objectName: K
): EditorState => {
  const newSelection = { ...state.selection };
  for (
    let startIndex = objectOrder.indexOf(objectName);
    startIndex < objectOrder.length;
    startIndex++
  ) {
    newSelection[objectOrder[startIndex]] = 0;
  }
  return {
    ...state,
    selection: newSelection,
  };
};

/**
 * The hierarchical order of all editor objects.
 */
const objectOrder: Array<keyof EditorSelectionObjects> = [
  "system",
  "scene",
  "entity",
  "component",
  "property",
];
