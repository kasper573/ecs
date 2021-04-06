import { pullMap } from "../../ecs-common/pullMap";
import { TreeNode } from "./TreeNode";
import { NodeHelpers } from "./NodeHelpers";

/**
 * Turns a flat node list into a tree structure.
 *
 * Does not return root node. Instead returns all nodes without a parent
 * as a list of root nodes, with the rest of the hierarchy as descendants.
 *
 * @param nodes The flat node list to turn into a tree structure
 * @param getId Gets the id of a specified node
 * @param getParentId Gets the parent id of a specified node. Return undefined for nodes belonging to root.
 * @param rootId Set to control which parentId to regard as the root. Defaults to undefined. Use this to select a subset of the hierarchy.
 * @param compareFn Set to sort each child group by this compare function.
 */
export const createTree = <Node, Id>(
  nodes: Node[],
  { getId, getParentId, rootId, compareFn }: CreateTreeOptions<Node, Id>
): TreeNode<Node>[] => {
  const treeNodeMap = new Map<Id, TreeNode<Node>>();
  const childrenMap = new Map<Id | undefined, TreeNode<Node>[]>();

  // Create TreeNode instances for all LibraryNodes
  // Create a map of all TreeNode children
  for (const node of nodes) {
    const treeNode = { value: node, children: [] };
    treeNodeMap.set(getId(node), treeNode);
    const children = pullMap(childrenMap, getParentId(node), []);
    children.push(treeNode);
  }

  // Assign children to parent nodes
  for (const node of nodes) {
    const id = getId(node);
    const treeNode = treeNodeMap.get(id)!;
    treeNode.children = childrenMap.get(id) ?? [];

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

export type CreateTreeOptions<Node, Id> = NodeHelpers<Node, Id> & {
  rootId?: Id;
  compareFn?: (a: TreeNode<Node>, b: TreeNode<Node>) => number;
};
