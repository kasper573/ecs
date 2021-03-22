import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { requireSystem } from "../selectors/requireSystem";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
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
  const deletedState = updateLibraryReducer(state, {
    systemId,
    change: (library) => without(library, node),
  });
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "inspected",
    didDelete: (selected) => selected?.object.id === nodeId,
  });
};
