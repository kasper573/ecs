import { MouseEvent } from "react";
import { MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import { LibraryNodeId } from "../../../ecs-serializable/src/definition/LibraryNode";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { MenuItemRendererProps } from "../hooks/useMenu";
import { combine } from "../../../ecs-common/src/combine";
import { cloneWithIndexAsKey } from "../../../ecs-common/src/cloneWithIndexAsKey";

export const createLibraryMenuFactory = (
  onCreateFolder: (parentNodeId?: LibraryNodeId) => void,
  onCreateEntity: (parentNodeId?: LibraryNodeId) => void,
  onRename: (node: TypedLibraryNode) => void,
  onDuplicate: (node: TypedLibraryNode) => void,
  onDelete: (node: TypedLibraryNode) => void
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
    node: TypedLibraryNode,
    { close }: MenuItemRendererProps
  ) {
    const isFolder = node.type === "folder";
    const forNodeId = isFolder ? node.nodeId : node.parentNodeId;
    const closeAnd = (and: (x: typeof node) => void) => (ev: MouseEvent) => {
      close(ev);
      and(node);
    };
    return [
      ...getCommonMenuItems({ close }, forNodeId),
      <MenuItem onClick={closeAnd(onRename)}>Rename</MenuItem>,
      !isFolder && (
        <MenuItem onClick={closeAnd(onDuplicate)}>Duplicate</MenuItem>
      ),
      <MenuItem onClick={closeAnd(onDelete)}>Delete</MenuItem>,
    ];
  }

  return {
    create: getCreateMenuItems,
    common: getCommonMenuItems,
    node: getMenuItemsForNode,
  };
};
