import styled from "styled-components";
import { TreeItem } from "@material-ui/lab";
import { MenuItem } from "@material-ui/core";
import React from "react";
import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { useContextMenu } from "../hooks/useContextMenu";
import { useOnFocusedAndKeyPressed } from "../hooks/useOnFocusedAndKeyPressed";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import {
  ComponentDefinitionIcon,
  EntityDefinitionIcon,
  FolderIcon,
  FolderOpenIcon,
} from "./icons";
import { LibraryTreeItems } from "./LibraryTreeItems";

export type LibraryTreeItemProps = {
  node: LibraryTreeNode;
  onEdit?: (node: DiscriminatedLibraryNode) => void;
  onDuplicate?: (node: DiscriminatedLibraryNode) => void;
  onDelete?: (node: DiscriminatedLibraryNode) => void;
};

export const LibraryTreeItem = ({
  node,
  onEdit,
  onDuplicate,
  onDelete,
}: LibraryTreeItemProps) => {
  const isFolder = node.value.type === "folder";
  const ref = useOnFocusedAndKeyPressed(
    "Delete",
    onDelete ? () => onDelete(node.value) : undefined
  );

  const [triggerProps, menu] = useContextMenu([
    onEdit && <MenuItem onClick={() => onEdit(node.value)}>Rename</MenuItem>,
    !isFolder && onDuplicate ? (
      <MenuItem onClick={() => onDuplicate(node.value)}>Duplicate</MenuItem>
    ) : undefined,
    onDelete && (
      <MenuItem onClick={() => onDelete(node.value)}>Delete</MenuItem>
    ),
  ]);

  const LabelIcon = labelIcons[node.value.type];
  const collapseIcon = isFolder ? <FolderOpenIcon /> : <LabelIcon />;
  const expandIcon = isFolder ? <FolderIcon /> : <LabelIcon />;
  return (
    <>
      {menu}
      <TreeItemWithoutFocusColor
        ref={ref}
        key={node.value.nodeId}
        nodeId={node.value.nodeId}
        label={node.value.name}
        collapseIcon={collapseIcon}
        expandIcon={expandIcon}
        {...triggerProps}
      >
        <LibraryTreeItems
          nodes={node.children}
          itemProps={{ onEdit, onDelete }}
        />
      </TreeItemWithoutFocusColor>
    </>
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
