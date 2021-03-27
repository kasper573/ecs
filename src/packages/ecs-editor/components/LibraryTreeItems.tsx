import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { LibraryTreeItem, LibraryTreeItemProps } from "./LibraryTreeItem";

export type LibraryTreeItemsProps = {
  nodes: LibraryTreeNode[];
  itemProps?: Partial<LibraryTreeItemProps>;
};

export const LibraryTreeItems = ({
  nodes,
  itemProps,
}: LibraryTreeItemsProps) => (
  <>
    {nodes.map((node) => (
      <LibraryTreeItem key={node.value.nodeId} node={node} {...itemProps} />
    ))}
  </>
);
