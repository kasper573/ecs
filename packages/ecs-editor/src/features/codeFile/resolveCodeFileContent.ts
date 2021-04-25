import { EditorState } from "../../types/EditorState";
import { CodeFile } from "./CodeFile";

export const resolveCodeFileContent = (file: CodeFile, state: EditorState) =>
  state.ecs.componentDefinitions[file.id].nativeComponent;
