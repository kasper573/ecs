import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { EditorLibraryTreeItem } from "./EditorLibraryTreeItem";

export type EditorLibraryTreeItemsProps = {
  nodes: LibraryTreeNode[];
};

export const EditorLibraryTreeItems = ({
  nodes,
}: EditorLibraryTreeItemsProps) => (
  <>
    {nodes.map((node) => (
      <EditorLibraryTreeItem key={node.value.id} node={node} />
    ))}
  </>
);
