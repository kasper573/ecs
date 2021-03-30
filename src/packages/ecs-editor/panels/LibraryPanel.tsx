import React, { useCallback } from "react";
import { IconButton, MenuItem } from "@material-ui/core";
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

export const LibraryPanel = () => {
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedNode = useSelector(selectSelectedLibraryNode);
  const nodes = useSelector(selectListOfLibraryNode);
  const [
    libraryNodeEvents,
    libraryNodeDialogs,
  ] = useCrudDialogs<DiscriminatedLibraryNode>({
    createDialogTitle: "Add entity",
    getItemName: (node) => node.name,
    onCreateItem: (name) =>
      dispatch(
        core.actions.createEntityDefinition({
          nodeId: uuid(),
          id: uuid(),
          systemId: selectedSystem?.id!,
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
  const [
    libraryFolderEvents,
    libraryFolderDialogs,
  ] = useCrudDialogs<LibraryFolder>({
    createDialogTitle: "Add folder",
    getItemName: (node) => node.name,
    onCreateItem: (name) =>
      dispatch(
        core.actions.createLibraryFolder({
          nodeId: uuid(),
          id: uuid(),
          systemId: selectedSystem?.id!,
          name,
        })
      ),
  });
  const handleDuplicate = useCallback(
    (node: DiscriminatedLibraryNode) => {
      switch (node.type) {
        case "entity":
          return dispatch(core.actions.duplicateEntityDefinition(node.id));
        case "component":
          return dispatch(core.actions.duplicateComponentDefinition(node.id));
      }
    },
    [dispatch]
  );
  return (
    <Panel name={PanelName.Library}>
      {libraryNodeDialogs}
      {libraryFolderDialogs}
      <PanelHeader title="Library">
        {selectedSystem && (
          <MenuFor
            items={[
              <MenuItem onClick={libraryFolderEvents.onCreateItem}>
                Folder
              </MenuItem>,
              <MenuItem onClick={libraryNodeEvents.onCreateItem}>
                Entity
              </MenuItem>,
            ]}
          >
            {(props) => (
              <IconButton edge="end" aria-label="create" {...props}>
                <AddIcon />
              </IconButton>
            )}
          </MenuFor>
        )}
      </PanelHeader>
      <LibraryTree
        selected={selectedNode}
        library={nodes}
        onEdit={libraryNodeEvents.onUpdateItem}
        onDuplicate={handleDuplicate}
        onDelete={libraryNodeEvents.onDeleteItem}
        onSelectedChange={({ nodeId }) =>
          dispatch(core.actions.setSelectedLibraryNode(nodeId))
        }
      />
    </Panel>
  );
};
