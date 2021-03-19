import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { LibraryTreeItem } from "./LibraryTreeItem";

export type LibraryTreeItemsProps = {
  nodes: LibraryTreeNode[];
};

export const LibraryTreeItems = ({ nodes }: LibraryTreeItemsProps) => (
  <>
    {nodes.map((node) => (
      <LibraryTreeItem key={node.value.id} node={node} />
    ))}
  </>
);
