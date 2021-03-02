import { DefinitionLibrary } from "../../ecs-serializable/types/DefinitionLibrary";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { updateSystemReducer } from "./updateSystemReducer";

/**
 * Update the specified system library with a partial update
 */
export const updateLibraryReducer: EditorStateReducer<{
  system: SystemDefinition | undefined;
  getUpdate: (current: DefinitionLibrary) => Partial<DefinitionLibrary>;
}> = (state, { system, getUpdate }) => {
  if (!system) {
    return state;
  }
  return updateSystemReducer(state, {
    system,
    update: {
      library: {
        ...system.library,
        ...getUpdate(system.library),
      },
    },
  });
};
