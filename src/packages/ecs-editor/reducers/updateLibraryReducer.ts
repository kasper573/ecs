import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { LibraryDefinition } from "../../ecs-serializable/types/LibraryDefinition";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateSystemReducer } from "./updateSystemReducer";

/**
 * Update the specified system library
 */
export const updateLibraryReducer: EditorStateReducer<{
  system?: SystemDefinition;
  change: (current: LibraryDefinition) => LibraryDefinition;
}> = (state, { system = selectSelectedSystem(state), change }) => {
  if (!system) {
    throw new Error(`System must be specified`);
  }
  return updateSystemReducer(state, {
    system,
    update: {
      library: change(system.library),
    },
  });
};
