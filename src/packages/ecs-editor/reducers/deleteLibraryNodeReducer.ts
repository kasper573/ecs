import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { requireSystem } from "../selectors/requireSystem";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const deleteLibraryNodeReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  nodeId: LibraryNodeId;
}> = (state, { systemId, nodeId }) => {
  const system = requireSystem(state, systemId);
  const node = system.library.find(({ id }) => id === nodeId);
  if (!node) {
    throw new Error("Could not find library node");
  }
  return updateLibraryReducer(state, {
    systemId,
    change: (library) => without(library, node),
  });
};
