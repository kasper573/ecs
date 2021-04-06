import { createTree } from "./createTree";
import { NodeHelpers } from "./NodeHelpers";

export const getDescendantNodeIds = <Node, Id>(
  nodes: Node[],
  rootId: Id,
  helpers: NodeHelpers<Node, Id>
) => {
  const [queue] = createTree(nodes, { ...helpers, rootId });
  const ids: Id[] = [];
  while (queue.length) {
    const descendant = queue.shift()!;
    ids.push(helpers.getId(descendant.value));
    queue.push(...descendant.children);
  }
  return ids;
};
