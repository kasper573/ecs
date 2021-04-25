import { EditorState } from "../../types/EditorState";
import { editorFileSelectors } from "./editorFileSelectors";
import { resolveEditorFile } from "./resolveEditorFile";

export const selectSelectedEditorFile = (state: EditorState) => {
  const selectedFile =
    state.selectedFileId !== undefined
      ? editorFileSelectors.selectById(state.files, state.selectedFileId)
      : undefined;
  if (selectedFile) {
    return resolveEditorFile(selectedFile, state);
  }
};
