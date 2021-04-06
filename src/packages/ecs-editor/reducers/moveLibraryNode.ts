import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { canMoveNodeTo } from "../tree/canMoveNodeTo";
import { CreateTreeOptions } from "../tree/createTree";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";

export const moveLibraryNode = createEditorStateReducer<{
  id: LibraryNodeId;
  targetId: LibraryNodeId;
}>((state, { payload: { id, targetId } }) => {
  const folders = Object.values(state.ecs.libraryFolders);
  if (!canMoveNodeTo(folders, id, targetId, treeOptions)) {
    throw new Error("Illegal library node move");
  }

  // Find node to mutate
  const isNode = (node: LibraryNode) => node.nodeId === id;
  const node =
    Object.values(state.ecs.entityDefinitions).find(isNode) ||
    Object.values(state.ecs.componentDefinitions).find(isNode) ||
    folders.find(isNode);
  if (!node) {
    throw new Error("Could not find library node to move");
  }
  node.parentNodeId = targetId;
});

const treeOptions: CreateTreeOptions<LibraryFolder, LibraryNodeId> = {
  getId: (node) => node.nodeId,
  getParentId: (node) => node.parentNodeId,
};
