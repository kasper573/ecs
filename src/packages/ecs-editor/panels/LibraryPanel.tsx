import React, { useRef } from "react";
import { IconButton, MenuItem, Tooltip } from "@material-ui/core";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { useDispatch, useSelector } from "../store";
import { selectListOfLibraryNode } from "../selectors/selectListOfLibraryNode";
import { LibraryTree } from "../components/LibraryTree";
import { core } from "../core";
import { Panel } from "../components/Panel";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { uuid } from "../../ecs-common/uuid";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedLibraryNode } from "../selectors/selectSelectedLibraryNode";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { MenuFor } from "../components/MenuFor";
import { AddIcon } from "../components/icons";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";
import { combine } from "../../ecs-common/combine";
import { MenuItemRendererProps } from "../hooks/useMenu";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";

export const LibraryPanel = () => {
  const parentNodeIdRef = useRef<LibraryNodeId>();
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedNode = useSelector(selectSelectedLibraryNode);
  const nodes = useSelector(selectListOfLibraryNode);

  const [nodeEvents, nodeDialogs] = useCrudDialogs<DiscriminatedLibraryNode>({
    createDialogTitle: "Add entity",
    getItemName: (node) => node.name,
    onCreateItem: (name) =>
      dispatch(
        core.actions.createEntityDefinition({
          nodeId: uuid(),
          id: uuid(),
          systemId: selectedSystem?.id!,
          parentNodeId: parentNodeIdRef.current,
          name,
          components: [],
        })
      ),
    onRenameItem: (target, name) => {
      switch (target.type) {
        case "entity":
          return dispatch(
            core.actions.renameEntityDefinition({ id: target.id, name })
          );
        case "component":
          return dispatch(
            core.actions.renameComponentDefinition({ id: target.id, name })
          );
        case "folder":
          return dispatch(
            core.actions.renameLibraryFolder({ id: target.id, name })
          );
      }
    },
    onDeleteItem: (node) => {
      switch (node.type) {
        case "entity":
          return dispatch(core.actions.deleteEntityDefinition(node.id));
        case "component":
          return dispatch(core.actions.deleteComponentDefinition(node.id));
        case "folder":
          return dispatch(core.actions.deleteLibraryFolder(node.id));
      }
    },
  });
  const [folderEvents, folderDialogs] = useCrudDialogs<LibraryFolder>({
    createDialogTitle: "Add folder",
    getItemName: (node) => node.name,
    onCreateItem: (name) =>
      dispatch(
        core.actions.createLibraryFolder({
          nodeId: uuid(),
          id: uuid(),
          systemId: selectedSystem?.id!,
          parentNodeId: parentNodeIdRef.current,
          name,
        })
      ),
  });
  const handleDuplicate = (node: DiscriminatedLibraryNode) => {
    switch (node.type) {
      case "entity":
        return dispatch(core.actions.duplicateEntityDefinition(node.id));
      case "component":
        return dispatch(core.actions.duplicateComponentDefinition(node.id));
    }
  };
  const handleSelect = ({ nodeId }: DiscriminatedLibraryNode) =>
    dispatch(core.actions.setSelectedLibraryNode(nodeId));
  const handleMoveNode = (
    node: DiscriminatedLibraryNode,
    target: DiscriminatedLibraryNode
  ) => {
    dispatch(
      core.actions.moveLibraryNode({
        id: node.nodeId,
        targetId: target.nodeId,
      })
    );
  };

  const renderCreateMenuItems = (
    { close }: MenuItemRendererProps,
    parentNodeId?: LibraryNodeId
  ) => [
    <MenuItem
      onClick={combine(close, () => {
        parentNodeIdRef.current = parentNodeId;
        folderEvents.onCreateItem();
      })}
    >
      Folder
    </MenuItem>,
    <MenuItem
      onClick={combine(close, () => {
        parentNodeIdRef.current = parentNodeId;
        nodeEvents.onCreateItem();
      })}
    >
      Entity
    </MenuItem>,
  ];

  const getMenuItemsForNode = (
    node: DiscriminatedLibraryNode,
    { close }: MenuItemRendererProps
  ) => {
    const isFolder = node.type === "folder";
    return [
      <MenuFor
        items={(props) =>
          renderCreateMenuItems(
            { close: combine(close, props.close)! },
            isFolder ? node.nodeId : node.parentNodeId
          )
        }
      >
        {(props) => <MenuItem {...props}>Create</MenuItem>}
      </MenuFor>,
      <MenuItem
        onClick={(e) => {
          close(e);
          nodeEvents.onUpdateItem(node);
        }}
      >
        Rename
      </MenuItem>,
      !isFolder && (
        <MenuItem
          onClick={(e) => {
            close(e);
            handleDuplicate(node);
          }}
        >
          Duplicate
        </MenuItem>
      ),
      <MenuItem
        onClick={(e) => {
          close(e);
          nodeEvents.onDeleteItem(node);
        }}
      >
        Delete
      </MenuItem>,
    ];
  };

  return (
    <Panel name={PanelName.Library}>
      {nodeDialogs}
      {folderDialogs}
      <PanelHeader title="Library">
        {selectedSystem && (
          <MenuFor items={renderCreateMenuItems}>
            {(props) => (
              <Tooltip title="Create">
                <IconButton edge="end" aria-label="create" {...props}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </MenuFor>
        )}
      </PanelHeader>
      <LibraryTree
        selected={selectedNode}
        library={nodes}
        itemProps={{
          menuItems: getMenuItemsForNode,
          onMoveNode: handleMoveNode,
        }}
        onSelectedChange={handleSelect}
      />
    </Panel>
  );
};
