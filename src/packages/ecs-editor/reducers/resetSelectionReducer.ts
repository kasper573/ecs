import { EditorState } from "../types/EditorState";
import { EditorSelection } from "../types/EditorSelection";
import { EditorObjectName, editorObjectsOrder } from "../types/EditorObjects";
import { getEditorSelectionDefault } from "../functions/getEditorSelectionDefault";

/**
 * Reset to the default selection for the specified object and all child objects
 */
export const resetSelectionReducer = <ObjectName extends keyof EditorSelection>(
  state: EditorState,
  fromObjectName: ObjectName
): EditorState => {
  const newSelection = { ...state.selection };
  const startIndex = editorObjectsOrder.indexOf(fromObjectName);
  editorObjectsOrder
    .slice(startIndex)
    .forEach(<ObjectName extends EditorObjectName>(objectName: ObjectName) => {
      newSelection[objectName] = getEditorSelectionDefault(state, objectName);
    });

  return {
    ...state,
    selection: newSelection,
  };
};
