import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { canMoveLibraryNodeTo } from "../functions/canMoveLibraryNodeTo";

export const moveLibraryNode = createEditorStateReducer<{
  id: LibraryNodeId;
  targetId: LibraryNodeId;
}>((state, { payload: { id, targetId } }) => {
  if (!canMoveLibraryNodeTo(state, id, targetId)) {
    throw new Error("Illegal library node move");
  }

  // Find node to mutate
  const isNode = (node: LibraryNode) => node.nodeId === id;
  const node =
    Object.values(state.ecs.entityDefinitions).find(isNode) ||
    Object.values(state.ecs.componentDefinitions).find(isNode) ||
    Object.values(state.ecs.libraryFolders).find(isNode);
  if (!node) {
    throw new Error("Could not find library node to move");
  }
  node.parentNodeId = targetId;
});
