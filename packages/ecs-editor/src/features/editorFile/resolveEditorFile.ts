import { EditorState } from "../../types/EditorState";
import { getEditorFileId } from "./getEditorFileId";
import { getEditorFileName } from "./getEditorFileName";
import { getEditorFileContent } from "./getEditorFileContent";
import { EditorFile } from "./EditorFile";

export const resolveEditorFile = (file: EditorFile, state: EditorState) => ({
  id: getEditorFileId(file),
  name: getEditorFileName(file, state),
  content: getEditorFileContent(file, state),
});
