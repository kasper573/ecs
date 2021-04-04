import { EditorState } from "../types/EditorState";
import { createECSDefinition } from "../../ecs-serializable/functions/createECSDefinition";

export const createEditorState = (): EditorState => ({
  ecs: createECSDefinition(),
  themeType: "dark",
  selection: {},
});
