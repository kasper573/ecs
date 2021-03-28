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
  | SelectedObjectOption<"scene">
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
      if (!didChange) {
        return; // Same selection
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
