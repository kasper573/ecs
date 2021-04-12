import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EditorState } from "../types/EditorState";

/**
 * Resets the entire editor state.
 * Should not be used for any normal user actions. Use only as last resort for certain development tools.
 */
export const setEditorState = createEditorStateReducer<EditorState>(
  (state, { payload }) => payload
);
