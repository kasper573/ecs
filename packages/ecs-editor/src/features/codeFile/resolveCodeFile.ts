import { EditorState } from "../../types/EditorState";
import { resolveCodeFileName } from "./resolveCodeFileName";
import { resolveCodeFileContent } from "./resolveCodeFileContent";
import { CodeFile } from "./CodeFile";

export const resolveCodeFile = (file: CodeFile, state: EditorState) => ({
  ...file,
  name: resolveCodeFileName(file, state),
  content: resolveCodeFileContent(file, state),
});
