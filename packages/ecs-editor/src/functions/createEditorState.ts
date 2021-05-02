import { EditorState } from "../types/EditorState";
import { createECSDefinition } from "../../../ecs-serializable/src/functions/createECSDefinition";
import { createWindowState } from "../features/window/createWindowState";

export const createEditorState = (): EditorState => ({
  ecs: createECSDefinition(),
  themeType: "dark",
  codeFiles: {
    ids: [],
    entities: {},
  },
  windows: createWindowState(),
});
