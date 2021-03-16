import { EditorState } from "../types/EditorState";
import {
  EditorSelectionName,
  editorSelectionOrder,
  EditorSelectionValues,
} from "../types/EditorSelection";
import { selectDefaultSelectionValue } from "../selectors/selectDefaultSelectionValue";

/**
 * Reset to the default selection for the specified object and all child objects
 */
export const resetSelectionReducer = <
  ObjectName extends keyof EditorSelectionValues
>(
  state: EditorState,
  fromObjectName: ObjectName
): EditorState => {
  const newSelection = { ...state.selection };
  const startIndex = editorSelectionOrder.indexOf(fromObjectName);
  editorSelectionOrder
    .slice(startIndex)
    .forEach(
      <ObjectName extends EditorSelectionName>(objectName: ObjectName) => {
        newSelection[objectName] = selectDefaultSelectionValue(
          state,
          objectName
        );
      }
    );

  return {
    ...state,
    selection: newSelection,
  };
};
