import styled from "styled-components";
import { TreeItem } from "@material-ui/lab";
import { MenuItem } from "@material-ui/core";
import React from "react";
import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { selectLibraryNodeLabel } from "../selectors/selectLibraryNodeLabel";
import { useContextMenu } from "../hooks/useContextMenu";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import {
  ComponentDefinitionIcon,
  EntityDefinitionIcon,
  FolderIcon,
  FolderOpenIcon,
} from "./icons";
import { LibraryTreeItems } from "./LibraryTreeItems";

export type LibraryTreeItemProps = {
  node: LibraryTreeNode;
  onEdit?: (node: LibraryNode) => void;
  onDelete?: (node: LibraryNode) => void;
};

export const LibraryTreeItem = ({
  node,
  onEdit,
  onDelete,
}: LibraryTreeItemProps) => {
  const [triggerProps, menu] = useContextMenu([
    onEdit && <MenuItem onClick={() => onEdit(node.value)}>Rename</MenuItem>,
    onDelete && (
      <MenuItem onClick={() => onDelete(node.value)}>Delete</MenuItem>
    ),
  ]);

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
      {...triggerProps}
    >
      <LibraryTreeItems
        nodes={node.children}
        itemProps={{ onEdit, onDelete }}
      />
      {menu}
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
