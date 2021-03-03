import styled from "styled-components";
import { TreeItem } from "@material-ui/lab";
import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { getLibraryNodeLabel } from "../functions/getLibraryNodeLabel";
import {
  ComponentIcon,
  EntityDefinitionIcon,
  FolderIcon,
  FolderOpenIcon,
} from "./icons";
import { EditorLibraryTreeItems } from "./EditorLibraryTreeItems";

export type EditorLibraryTreeItemProps = { node: LibraryTreeNode };

export const EditorLibraryTreeItem = ({ node }: EditorLibraryTreeItemProps) => {
  const isFolder = node.value.type === "folder";
  const LabelIcon = labelIcons[node.value.type];
  const collapseIcon = isFolder ? <FolderOpenIcon /> : <LabelIcon />;
  const expandIcon = isFolder ? <FolderIcon /> : <LabelIcon />;
  return (
    <TreeItemWithoutFocusColor
      key={node.value.id}
      nodeId={node.value.id}
      label={getLibraryNodeLabel(node.value)}
      collapseIcon={collapseIcon}
      expandIcon={expandIcon}
    >
      <EditorLibraryTreeItems nodes={node.children} />
    </TreeItemWithoutFocusColor>
  );
};

const TreeItemWithoutFocusColor = styled(TreeItem)`
  &.MuiTreeItem-root:not(.Mui-selected):focus
    > .MuiTreeItem-content
    .MuiTreeItem-label {
    background-color: transparent;
  }
`;

const labelIcons = {
  folder: FolderIcon,
  entity: EntityDefinitionIcon,
  component: ComponentIcon,
};