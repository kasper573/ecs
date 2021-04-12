import { getDescendantNodeIds } from "./getDescendantNodeIds";
import { NodeHelpers } from "./NodeHelpers";

export const canMoveNodeTo = <Node, Id>(
  nodes: Node[],
  fromId: Id,
  toId: Id | undefined,
  helpers: NodeHelpers<Node, Id>
) => {
  if (!toId) {
    // Moving to root is always okay
    return true;
  }
  const invalidTargetIds = [
    fromId,
    ...getDescendantNodeIds(nodes, fromId, helpers),
  ];
  return !invalidTargetIds.includes(toId);
};
