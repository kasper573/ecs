import { EditorState } from "../../types/EditorState";
import { ECSScript } from "../../../../ecs-serializable/src/definition/ECSScript";
import { CodeFile } from "./CodeFile";

export const resolveCodeFileContent = (
  file: CodeFile,
  state: EditorState
): ECSScript => state.ecs.componentDefinitions[file.id].script ?? { code: "" };
