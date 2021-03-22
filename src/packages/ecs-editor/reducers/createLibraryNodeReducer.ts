import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const createLibraryNodeReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  node: LibraryNode;
}> = (state, { systemId, node }) => {
  return updateLibraryReducer(state, {
    systemId,
    change: (library) => [...library, node],
  });
};
