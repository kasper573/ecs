import { EditorState } from "../../types/EditorState";
import { editorFileSelectors } from "./editorFileSelectors";
import { resolveEditorFile } from "./resolveEditorFile";

export const selectListOfEditorFile = (state: EditorState) =>
  editorFileSelectors
    .selectAll(state.files)
    .map((file) => resolveEditorFile(file, state));
