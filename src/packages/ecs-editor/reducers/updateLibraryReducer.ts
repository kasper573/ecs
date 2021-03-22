import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { LibraryDefinition } from "../../ecs-serializable/types/LibraryDefinition";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { requireSystem } from "../selectors/requireSystem";
import { updateSystemReducer } from "./updateSystemReducer";

/**
 * Update the specified system library
 */
export const updateLibraryReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  change: (current: LibraryDefinition) => LibraryDefinition;
}> = (state, { systemId, change }) => {
  return updateSystemReducer(state, {
    systemId,
    update: {
      library: change(requireSystem(state, systemId).library),
    },
  });
};
