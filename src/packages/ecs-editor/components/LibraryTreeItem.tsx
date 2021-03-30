import styled from "styled-components";
import { TreeItem } from "@material-ui/lab";
import { MenuItem } from "@material-ui/core";
import React, { useRef } from "react";
import { DragSourceMonitor } from "react-dnd";
import { LibraryTreeNode } from "../types/LibraryTreeNode";
import { useContextMenu } from "../hooks/useContextMenu";
import { useOnFocusedAndKeyPressed } from "../hooks/useOnFocusedAndKeyPressed";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { useDragForRef } from "../../ecs-common/useDragForRef";
import { DragType } from "../types/DragType";
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
  const focusRef = useRef<Element>();
  const [, drag] = useDragForRef(focusRef, dragSpec(node.value));
  const isFolder = node.value.type === "folder";

  useOnFocusedAndKeyPressed(
    "Delete",
    focusRef,
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
        ref={drag}
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

const dragSpec = (node: DiscriminatedLibraryNode) => {
  const base = {
    type: DragType.Unknown,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  };
  if (node.type === "entity") {
    return {
      ...base,
      type: DragType.EntityDefinition,
      item: node as unknown,
    };
  }
  if (node.type === "component") {
    return {
      ...base,
      type: DragType.ComponentDefinition,
      item: node as unknown,
    };
  }
  return base;
};
