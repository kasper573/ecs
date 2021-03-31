import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { createLibraryTree } from "./createLibraryTree";

export const getDescendantNodeIds = (
  nodes: LibraryNode[],
  id: LibraryNodeId
) => {
  const queue = createLibraryTree(nodes, { rootId: id });
  const ids: LibraryNodeId[] = [];
  while (queue.length) {
    const descendant = queue.shift()!;
    ids.push(descendant.value.nodeId);
    queue.push(...descendant.children);
  }
  return ids;
};
