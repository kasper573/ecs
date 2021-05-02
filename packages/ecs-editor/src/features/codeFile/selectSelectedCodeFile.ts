import { EditorState } from "../../types/EditorState";
import { codeFileSelectors } from "./codeFileSelectors";
import { resolveCodeFile } from "./resolveCodeFile";

export const selectSelectedCodeFile = (state: EditorState) => {
  const selectedFile =
    state.selectedCodeFileId !== undefined
      ? codeFileSelectors.selectById(state.codeFiles, state.selectedCodeFileId)
      : undefined;
  if (selectedFile) {
    return resolveCodeFile(selectedFile, state);
  }
};
