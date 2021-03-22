import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const updateLibraryNodeReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  nodeId: LibraryNodeId;
  replacement: LibraryNode;
}> = (state, { systemId, nodeId, replacement }) => {
  return updateLibraryReducer(state, {
    systemId,
    change: (library) => {
      const updated = library.slice();
      const index = updated.findIndex((node) => node.id === nodeId);
      if (index === -1) {
        throw new Error("Can't find library node");
      }
      updated[index] = replacement;
      return updated;
    },
  });
};
