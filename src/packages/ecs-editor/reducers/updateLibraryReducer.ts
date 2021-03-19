import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { LibraryDefinition } from "../../ecs-serializable/types/LibraryDefinition";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { updateSystemReducer } from "./updateSystemReducer";

/**
 * Update the specified system library
 */
export const updateLibraryReducer: EditorStateReducer<{
  system: SystemDefinition | undefined;
  change: (current: LibraryDefinition) => LibraryDefinition;
}> = (state, { system, change }) => {
  if (!system) {
    return state;
  }
  return updateSystemReducer(state, {
    system,
    update: {
      library: change(system.library),
    },
  });
};
