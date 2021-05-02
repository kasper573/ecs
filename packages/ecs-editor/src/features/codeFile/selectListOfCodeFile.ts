import { EditorState } from "../../types/EditorState";
import { codeFileSelectors } from "./codeFileSelectors";
import { resolveCodeFile } from "./resolveCodeFile";

export const selectListOfCodeFile = (state: EditorState) =>
  codeFileSelectors
    .selectAll(state.codeFiles)
    .map((file) => resolveCodeFile(file, state));
