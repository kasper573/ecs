import { EditorState } from "../../types/EditorState";
import { EditorFile } from "./EditorFile";

export const getEditorFileContent = (
  file: EditorFile,
  state: EditorState
): string => {
  switch (file.type) {
    case "componentDefinition":
      return state.ecs.componentDefinitions[file.definitionId].nativeComponent;
  }
};
