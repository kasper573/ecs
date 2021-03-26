import { EditorState } from "../types/EditorState";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";

export const createEditorState = (
  nativeComponents: NativeComponents = {}
): EditorState => ({
  ecs: {
    systems: {},
    scenes: {},
    entityInitializers: {},
    entityDefinitions: {},
    componentDefinitions: {},
    libraryFolders: {},
  },
  selection: {},
  nativeComponents,
});
