import { EditorState } from "../types/EditorState";

export const createEditorState = (): EditorState => ({
  ecs: {
    systems: {},
    scenes: {},
    entityInitializers: {},
    entityDefinitions: {},
    componentDefinitions: {},
    libraryFolders: {},
  },
  themeType: "dark",
  selection: {},
});
