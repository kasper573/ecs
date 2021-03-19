import styled from "styled-components";
import { TreeItem } from "@material-ui/lab";
import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { selectLibraryNodeLabel } from "../selectors/selectLibraryNodeLabel";
import {
  ComponentDefinitionIcon,
  EntityDefinitionIcon,
  FolderIcon,
  FolderOpenIcon,
} from "./icons";
import { LibraryTreeItems } from "./LibraryTreeItems";

export type LibraryTreeItemProps = { node: LibraryTreeNode };

export const LibraryTreeItem = ({ node }: LibraryTreeItemProps) => {
  const isFolder = node.value.type === "folder";
  const LabelIcon = labelIcons[node.value.type];
  const collapseIcon = isFolder ? <FolderOpenIcon /> : <LabelIcon />;
  const expandIcon = isFolder ? <FolderIcon /> : <LabelIcon />;
  return (
    <TreeItemWithoutFocusColor
      key={node.value.id}
      nodeId={node.value.id}
      label={selectLibraryNodeLabel(node.value)}
      collapseIcon={collapseIcon}
      expandIcon={expandIcon}
    >
      <LibraryTreeItems nodes={node.children} />
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
  component: ComponentDefinitionIcon,
};
