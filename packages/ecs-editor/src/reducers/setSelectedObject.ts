import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  EditorSelectionName,
  editorSelectionOrder,
  EditorSelectionValues,
} from "../types/EditorSelection";
import { createEditorState } from "../functions/createEditorState";
import { getDefaultSelectionValue } from "../functions/getDefaultSelectionValue";

type SelectedObjectOption<K extends keyof EditorSelectionValues> = {
  type: K;
  value: EditorSelectionValues[K];
};

type SetSelectedObjectPayload =
  | SelectedObjectOption<"system">
  | SelectedObjectOption<"inspected">;

export const setSelectedObjectAction = createAction<SetSelectedObjectPayload>(
  "setSelectedObject"
);

/**
 * Updates the selection for the specified object type
 */
export const setSelectedObject = createReducer(createEditorState(), (builder) =>
  builder.addCase(
    setSelectedObjectAction,
    (state, { payload: { type, value } }) => {
      const didChange = state.selection[type] !== value;

      // Remember the most recent selection (but not when unsetting a selection)
      if (value) {
        state.mostRecentSelectionName = type;
      }

      if (!didChange) {
        return; // No change to the selection value, can early out
      }

      // Apply selection
      (<ObjectName extends EditorSelectionName>(
        type: ObjectName,
        value: EditorSelectionValues[ObjectName]
      ) => {
        state.selection[type] = value;
      })(type, value);

      // Reset selection for objects below the selected object
      const nextObjectName =
        editorSelectionOrder[editorSelectionOrder.indexOf(type) + 1];
      if (!nextObjectName) {
        return; // Nothing to reset
      }
      const startIndex = editorSelectionOrder.indexOf(nextObjectName);
      editorSelectionOrder
        .slice(startIndex)
        .forEach(
          <ObjectName extends EditorSelectionName>(objectName: ObjectName) => {
            state.selection[objectName] = getDefaultSelectionValue(
              state,
              objectName
            );
          }
        );
    }
  )
);
