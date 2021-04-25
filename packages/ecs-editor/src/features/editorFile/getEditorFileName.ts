import { EditorState } from "../../types/EditorState";
import { EditorFile } from "./EditorFile";

export const getEditorFileName = (file: EditorFile, state: EditorState) => {
  switch (file.type) {
    case "componentDefinition":
      return state.ecs.componentDefinitions[file.definitionId].name;
  }
};
