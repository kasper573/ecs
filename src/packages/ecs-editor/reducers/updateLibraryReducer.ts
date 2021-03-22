import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { LibraryDefinition } from "../../ecs-serializable/types/LibraryDefinition";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { requireSystem } from "../selectors/requireSystem";
import { updateSystemReducer } from "./updateSystemReducer";
import { reactToLibraryUpdateReducer } from "./reactToLibraryUpdateReducer";

/**
 * Update the specified system library
 */
export const updateLibraryReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  change: (current: LibraryDefinition) => LibraryDefinition;
}> = (state, { systemId, change }) => {
  const updatedState = updateSystemReducer(state, {
    systemId,
    update: {
      library: change(requireSystem(state, systemId).library),
    },
  });
  return reactToLibraryUpdateReducer(updatedState, {
    affectedSystemId: systemId,
    prevState: state,
  });
};
