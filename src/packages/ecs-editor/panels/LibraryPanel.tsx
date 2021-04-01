import { IconButton, Tooltip } from "@material-ui/core";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { useDispatch, useSelector, useStore } from "../store";
import { selectListOfLibraryNode } from "../selectors/selectListOfLibraryNode";
import { LibraryTree } from "../components/LibraryTree";
import { core } from "../core";
import { Panel } from "../components/Panel";
import { uuid } from "../../ecs-common/uuid";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedLibraryNode } from "../selectors/selectSelectedLibraryNode";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { MenuFor } from "../components/MenuFor";
import { AddIcon } from "../icons";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { libraryNodeDropSpec } from "../dnd/libraryNodeDropSpec";
import { useContextMenu } from "../hooks/useContextMenu";
import { createLibraryMenuFactory } from "../functions/createLibraryMenuFactory";
import { useDialog } from "../hooks/useDialog";
import { NameDialog } from "../components/NameDialog";
import { DeleteDialog } from "../components/DeleteDialog";
import { createRenameLibraryNodeAction } from "../actions/createRenameLibraryNodeAction";
import { createDeleteLibraryNodeAction } from "../actions/createDeleteLibraryNodeAction";
import { createDuplicateLibraryNodeAction } from "../actions/createDuplicateLibraryNodeAction";

export const LibraryPanel = () => {
  const store = useStore();
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedNode = useSelector(selectSelectedLibraryNode);
  const nodes = useSelector(selectListOfLibraryNode);

  const [{ canDrop: canDropToRoot }, rootDrop] = useDrop(
    libraryNodeDropSpec(
      rootNode,
      handleMoveToRoot,
      () => store.getState().present
    )
  );

  const showCreateFolderDialog = useDialog(
    (props, parentNodeId?: LibraryNodeId) => (
      <NameDialog
        {...props}
        title="New folder"
        onSave={(name) => handleCreateFolder(name, parentNodeId)}
      />
    )
  );

  const showCreateEntityDialog = useDialog(
    (props, parentNodeId?: LibraryNodeId) => (
      <NameDialog
        {...props}
        title="New entity"
        onSave={(name) => handleCreateEntity(name, parentNodeId)}
      />
    )
  );

  const showRenameNodeDialog = useDialog((props, node: TypedLibraryNode) => (
    <NameDialog
      {...props}
      title={`Rename ${node.name}`}
      defaultValue={node.name}
      onSave={(name) => handleRenameNode(node, name)}
    />
  ));

  const showDeleteNodeDialog = useDialog((props, node: TypedLibraryNode) => (
    <DeleteDialog
      {...props}
      name={node.name}
      onDelete={() => handleDeleteNode(node)}
    />
  ));

  const menuItemFactory = createLibraryMenuFactory(
    showCreateFolderDialog,
    showCreateEntityDialog,
    showRenameNodeDialog,
    handleDuplicate,
    showDeleteNodeDialog
  );

  const [rootContextMenuProps, rootContextMenu] = useContextMenu(
    menuItemFactory.common
  );

  function handleCreateFolder(name: string, parentNodeId?: LibraryNodeId) {
    dispatch(
      core.actions.createLibraryFolder({
        nodeId: uuid(),
        id: uuid(),
        systemId: selectedSystem?.id!,
        parentNodeId,
        name,
      })
    );
  }

  function handleCreateEntity(name: string, parentNodeId?: LibraryNodeId) {
    dispatch(
      core.actions.createEntityDefinition({
        nodeId: uuid(),
        id: uuid(),
        systemId: selectedSystem?.id!,
        parentNodeId,
        name,
        components: [],
      })
    );
  }

  function handleRenameNode(target: TypedLibraryNode, name: string) {
    dispatch(createRenameLibraryNodeAction(target, name));
  }

  function handleDeleteNode(node: TypedLibraryNode) {
    dispatch(createDeleteLibraryNodeAction(node));
  }

  function handleDuplicate(node: TypedLibraryNode) {
    const action = createDuplicateLibraryNodeAction(node);
    if (action) {
      dispatch(action);
    }
  }

  function handleSelect({ nodeId }: TypedLibraryNode) {
    dispatch(core.actions.setSelectedLibraryNode(nodeId));
  }

  function handleMoveNode(node: TypedLibraryNode, target: TypedLibraryNode) {
    dispatch(
      core.actions.moveLibraryNode({
        id: node.nodeId,
        targetId: target.nodeId,
      })
    );
  }

  function handleMoveToRoot(node: TypedLibraryNode) {
    if (canDropToRoot) {
      handleMoveNode(node, rootNode);
    }
  }

  return (
    <Panel ref={rootDrop} name={PanelName.Library} {...rootContextMenuProps}>
      {rootContextMenu}
      <PanelHeader title="Library">
        {selectedSystem && (
          <MenuFor items={menuItemFactory.create}>
            {(props) => (
              <Tooltip title="New">
                <IconButton edge="end" aria-label="New" {...props}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </MenuFor>
        )}
      </PanelHeader>
      <LibraryTreeWithLeftMargin
        selected={selectedNode}
        library={nodes}
        itemProps={{
          menuItems: menuItemFactory.node,
          onMoveNode: handleMoveNode,
        }}
        onSelectedChange={handleSelect}
      />
    </Panel>
  );
};

const LibraryTreeWithLeftMargin = styled(LibraryTree)`
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`;

// Is safe as root node since belonging to the root means to have no parent
const rootNode = { type: "folder" } as TypedLibraryNode;
