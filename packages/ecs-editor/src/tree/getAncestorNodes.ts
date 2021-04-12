import { TreeNode } from "./TreeNode";

export const getAncestorNodes = <Node>(node: TreeNode<Node>) => {
  const ancestors: Node[] = [];
  let next = node.parent;
  while (next) {
    ancestors.push(next.value);
    next = next.parent;
  }
  return ancestors;
};
