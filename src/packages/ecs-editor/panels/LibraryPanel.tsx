import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { PanelName } from "../components/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { AddIcon } from "../components/icons";
import { useDispatch, useSelector } from "../store";
import { selectListOfLibraryNode } from "../selectors/selectListOfLibraryNode";
import { LibraryTree } from "../components/LibraryTree";
import { core } from "../slices/core";
import { Panel } from "../components/Panel";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { uuid } from "../functions/uuid";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedLibraryNode } from "../selectors/selectSelectedLibraryNode";
import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";

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
    onRenameItem: (target, name) =>
      dispatch(
        core.actions.renameLibraryNode({
          nodeId: target.nodeId,
          name,
        })
      ),
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
  return (
    <Panel name={PanelName.Library}>
      {libraryNodeDialogs}
      <PanelHeader title="Library">
        {selectedSystem && (
          <Tooltip title="Create entity">
            <IconButton
              edge="end"
              aria-label="create entity"
              onClick={libraryNodeEvents.onCreateItem}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </PanelHeader>
      <LibraryTree
        selected={selectedNode}
        library={nodes}
        onEdit={libraryNodeEvents.onUpdateItem}
        onDelete={libraryNodeEvents.onDeleteItem}
        onSelectedChange={({ nodeId }) =>
          dispatch(core.actions.setSelectedLibraryNode(nodeId))
        }
      />
    </Panel>
  );
};
