import { EditorState } from "../types/EditorState";
import { EditorSelection } from "../types/EditorSelection";
import { editorObjectsOrder } from "../types/EditorObjects";
import { getEditorSelectionDefault } from "../functions/getEditorSelectionDefault";

/**
 * Reset to the default selection for the specified object and all child objects
 */
export const resetSelectionReducer = <ObjectName extends keyof EditorSelection>(
  state: EditorState,
  fromObjectName: ObjectName
): EditorState => {
  const newSelection = { ...state.selection };
  for (
    let startIndex = editorObjectsOrder.indexOf(fromObjectName);
    startIndex < editorObjectsOrder.length;
    startIndex++
  ) {
    const objectName = editorObjectsOrder[startIndex];
    newSelection[objectName] = getEditorSelectionDefault(state, objectName);
  }
  return {
    ...state,
    selection: newSelection,
  };
};
