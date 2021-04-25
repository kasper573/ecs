import { createEntityAdapter } from "@reduxjs/toolkit";
import { EditorFile } from "./EditorFile";
import { getEditorFileId } from "./getEditorFileId";

export const editorFileAdapter = createEntityAdapter<EditorFile>({
  selectId: getEditorFileId,
  sortComparer: (a, b) => a.order - b.order,
});
