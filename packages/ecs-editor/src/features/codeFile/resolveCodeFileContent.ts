import { EditorState } from "../../types/EditorState";
import { ComponentPropertyFunctionDefinition } from "../../../../ecs-serializable/src/definition/ComponentPropertiesDefinition";
import { CodeFile } from "./CodeFile";

export const resolveCodeFileContent = (
  file: CodeFile,
  state: EditorState
): ComponentPropertyFunctionDefinition => ({
  code: state.ecs.componentDefinitions[file.id].nativeComponent,
});
