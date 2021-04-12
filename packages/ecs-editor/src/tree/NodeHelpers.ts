export type NodeHelpers<Node, Id> = {
  getId: (node: Node) => Id;
  getParentId: (node: Node) => Id | undefined;
};
