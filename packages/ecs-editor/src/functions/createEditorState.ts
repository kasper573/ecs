import { EditorState } from "../types/EditorState";
import { createECSDefinition } from "../../../ecs-serializable/src/functions/createECSDefinition";

export const createEditorState = (): EditorState => ({
  ecs: createECSDefinition(),
  themeType: "dark",
  files: {
    ids: [],
    entities: {},
  },
});
