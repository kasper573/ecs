import React from "react";
import { MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { MenuItemRendererProps } from "../hooks/useMenu";
import { combine } from "../../ecs-common/combine";
import { cloneWithIndexAsKey } from "./cloneWithIndexAsKey";

export const createLibraryMenuFactory = (
  onCreateFolder: (parentNodeId?: LibraryNodeId) => void,
  onCreateEntity: (parentNodeId?: LibraryNodeId) => void,
  onRenameNode: (node: DiscriminatedLibraryNode) => void,
  onDuplicateNode: (node: DiscriminatedLibraryNode) => void,
  onDeleteNode: (node: DiscriminatedLibraryNode) => void
) => {
  function getCreateMenuItems(
    { close }: MenuItemRendererProps,
    parentNodeId?: LibraryNodeId
  ) {
    return [
      <MenuItem onClick={combine(close, () => onCreateFolder(parentNodeId))}>
        Folder
      </MenuItem>,
      <MenuItem onClick={combine(close, () => onCreateEntity(parentNodeId))}>
        Entity
      </MenuItem>,
    ];
  }

  function getCommonMenuItems(
    { close }: MenuItemRendererProps,
    parentNodeId?: LibraryNodeId
  ) {
    return [
      <NestedMenuItem label="New" parentMenuOpen={true}>
        {getCreateMenuItems({ close }, parentNodeId).map(cloneWithIndexAsKey)}
      </NestedMenuItem>,
    ];
  }

  function getMenuItemsForNode(
    node: DiscriminatedLibraryNode,
    { close }: MenuItemRendererProps
  ) {
    const isFolder = node.type === "folder";
    return [
      ...getCommonMenuItems(
        { close },
        isFolder ? node.nodeId : node.parentNodeId
      ),
      <MenuItem
        onClick={(e) => {
          close(e);
          onRenameNode(node);
        }}
      >
        Rename
      </MenuItem>,
      !isFolder && (
        <MenuItem
          onClick={(e) => {
            close(e);
            onDuplicateNode(node);
          }}
        >
          Duplicate
        </MenuItem>
      ),
      <MenuItem
        onClick={(e) => {
          close(e);
          onDeleteNode(node);
        }}
      >
        Delete
      </MenuItem>,
    ];
  }

  return {
    create: getCreateMenuItems,
    common: getCommonMenuItems,
    node: getMenuItemsForNode,
  };
};
