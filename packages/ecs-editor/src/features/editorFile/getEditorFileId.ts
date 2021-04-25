import { EditorFile, EditorFileId } from "./EditorFile";

export const getEditorFileId = (file: EditorFile): EditorFileId => {
  switch (file.type) {
    case "componentDefinition":
      return file.definitionId as EditorFileId;
  }
};
