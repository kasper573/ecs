import { EditorState } from "../types/EditorState";

export const createEditorState = (): EditorState => ({
  ecs: {
    systems: {},
    scenes: {},
    entities: {},
    library: {},
  },
  selection: {},
});
