import { EditorState } from "../../types/EditorState";
import { CodeFile } from "./CodeFile";

export const resolveCodeFileName = (file: CodeFile, state: EditorState) =>
  state.ecs.componentDefinitions[file.id].name;
