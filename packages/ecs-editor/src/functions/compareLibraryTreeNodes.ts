import { LibraryTreeNode } from "../types/LibraryTreeNode";

export const compareLibraryTreeNodes = (
  nodeA: LibraryTreeNode,
  nodeB: LibraryTreeNode
) => {
  const a = nodeA.value;
  const b = nodeB.value;
  const typeComparison = cmp(typeOrders[a.type], typeOrders[b.type]);
  return typeComparison === 0 ? a.name.localeCompare(b.name) : typeComparison;
};

const cmp = (a: number, b: number) => (a === b ? 0 : a < b ? -1 : 1);

const typeOrders = {
  folder: 0,
  entity: 1,
  component: 1,
};
