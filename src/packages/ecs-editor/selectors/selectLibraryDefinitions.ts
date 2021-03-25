import { EditorState } from "../types/EditorState";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";

export const selectLibraryDefinitions = (state: EditorState) =>
  getDefinitionsInLibrary(
    state.ecs.library,
    (node) => node.systemId === state.selection.system
  );
