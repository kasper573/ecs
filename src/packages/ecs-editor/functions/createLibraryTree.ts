import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { TreeNode } from "../types/TreeNode";
import { pullMap } from "./pullMap";

/**
 * Creates a tree data structure of a LibraryDefinition.
 *
 * Does not provide a single root node, but returns all nodes without a parent
 * as a list of root nodes, with the rest of the hierarchy as descendants.
 *
 * @param library The library to turn into a tree structure
 * @param rootId Set to control which parentId to regard as the root. Defaults to undefined. Use this to select a subset of the hierarchy.
 * @param compareFn Set to sort each child group by this compare function.
 */
export const createLibraryTree = <Node extends LibraryNode>(
  library: Node[],
  { rootId, compareFn }: CreateLibraryTreeOptions<Node>
): TreeNode<Node>[] => {
  const treeNodeMap = new Map<LibraryNodeId, TreeNode<Node>>();
  const childrenMap = new Map<LibraryNodeId | undefined, TreeNode<Node>[]>();

  // Create TreeNode instances for all LibraryNodes
  // Create a map of all TreeNode children
  for (const libraryNode of library) {
    const treeNode = { value: libraryNode, children: [] };
    treeNodeMap.set(libraryNode.nodeId, treeNode);
    const children = pullMap(childrenMap, libraryNode.parentNodeId, []);
    children.push(treeNode);
  }

  // Assign children to parent nodes
  for (const { nodeId } of library) {
    const treeNode = treeNodeMap.get(nodeId)!;
    treeNode.children = childrenMap.get(nodeId) ?? [];

    // Apply sort to all children
    if (compareFn) {
      treeNode.children.sort(compareFn);
    }
  }

  const rootNodes = childrenMap.get(rootId) ?? [];

  // Root nodes have no parent so we never sorted them in
  // the step above, so make sure to sort root nodes as well
  if (compareFn) {
    rootNodes.sort(compareFn);
  }

  return rootNodes;
};

type CreateLibraryTreeOptions<Node extends LibraryNode> = {
  rootId?: LibraryNodeId;
  compareFn?: (a: TreeNode<Node>, b: TreeNode<Node>) => number;
};
