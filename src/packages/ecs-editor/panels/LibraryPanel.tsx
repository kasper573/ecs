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
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { getLibraryNodeLabel } from "../functions/getLibraryNodeLabel";
import { uuid } from "../functions/uuid";
import { renameLibraryNode } from "../functions/renameLibraryNode";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedLibraryNode } from "../selectors/selectSelectedLibraryNode";

export const LibraryPanel = () => {
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedNode = useSelector(selectSelectedLibraryNode);
  const nodes = useSelector(selectListOfLibraryNode);
  const [libraryNodeEvents, LibraryNodeDialogs] = useCrudDialogs<LibraryNode>({
    createDialogTitle: "Add entity",
    getItemName: getLibraryNodeLabel,
    onCreateItem: (name) =>
      dispatch(
        core.actions.createLibraryNode({
          systemId: selectedSystem?.id!,
          id: uuid(),
          type: "entity",
          entity: { id: uuid(), name, components: [] },
        })
      ),
    onRenameItem: (target, name) =>
      dispatch(
        core.actions.updateLibraryNode({
          nodeId: target.id,
          replacement: renameLibraryNode(target, name),
        })
      ),
    onDeleteItem: (node) => dispatch(core.actions.deleteLibraryNode(node.id)),
  });
  return (
    <Panel name={PanelName.Library}>
      <LibraryNodeDialogs />
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
        onSelectedChange={(node) =>
          dispatch(core.actions.selectLibraryNode(node.id))
        }
      />
    </Panel>
  );
};
