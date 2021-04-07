import { IconButton, Tooltip } from "@material-ui/core";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { useDispatch, useSelector, useStore } from "../store";
import { selectListOfLibraryNode } from "../selectors/selectListOfLibraryNode";
import { CommonTreeView } from "../components/CommonTreeView";
import { core } from "../core";
import { Panel } from "../components/Panel";
import { uuid } from "../../ecs-common/uuid";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedLibraryNode } from "../selectors/selectSelectedLibraryNode";
import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { MenuFor } from "../components/MenuFor";
import {
  AddIcon,
  ComponentDefinitionIcon,
  EntityDefinitionIcon,
  FolderClosedIcon,
  FolderIcon,
  FolderOpenIcon,
} from "../icons";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { libraryNodeDropSpec } from "../dnd/libraryNodeDropSpec";
import { useContextMenu } from "../hooks/useContextMenu";
import { createLibraryMenuFactory } from "../functions/createLibraryMenuFactory";
import { useDialog } from "../hooks/useDialog";
import { NameDialog } from "../dialogs/NameDialog";
import { DeleteDialog } from "../dialogs/DeleteDialog";
import { createRenameLibraryNodeAction } from "../actions/createRenameLibraryNodeAction";
import { createDeleteLibraryNodeAction } from "../actions/createDeleteLibraryNodeAction";
import { createDuplicateLibraryNodeAction } from "../actions/createDuplicateLibraryNodeAction";
import { CreateTreeOptions } from "../tree/createTree";
import { compareLibraryTreeNodes } from "../functions/compareLibraryTreeNodes";
import { libraryNodeDragSpec } from "../dnd/libraryNodeDragSpec";
import { TreeNode } from "../tree/TreeNode";
import { Intro } from "../../intro/Intro";

export const LibraryPanel = () => {
  const store = useStore();
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedNode = useSelector(selectSelectedLibraryNode);
  const nodes = useSelector(selectListOfLibraryNode);

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
      title={`Rename "${node.name}"`}
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

  function handleMoveNode(node: TypedLibraryNode, target?: TypedLibraryNode) {
    dispatch(
      core.actions.moveLibraryNode({
        id: node.nodeId,
        targetId: target?.nodeId,
      })
    );
  }

  return (
    <Panel name={PanelName.Library} {...rootContextMenuProps}>
      {rootContextMenu}
      <PanelHeader
        title={
          <Intro
            introId="WhatIsTheLibrary"
            message="The library contains components and entity definitions. These are used to populate the Hierarchy."
          >
            <span>Library</span>
          </Intro>
        }
      >
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
      <CommonTreeView
        nodes={nodes}
        selected={selectedNode}
        initialExpanded={getInitialExpanded}
        onSelectedChange={handleSelect}
        treeOptions={treeOptions}
        itemProps={{
          menuItems: menuItemFactory.node,
          onMoveNode: handleMoveNode,
          treeItemProps: getItemProps,
          dragSpec: libraryNodeDragSpec,
          dropSpec: (node, onDrop) =>
            libraryNodeDropSpec(node, onDrop, () => store.getState().present),
        }}
      />
    </Panel>
  );
};

function getItemProps({ value }: TreeNode<TypedLibraryNode>) {
  const isFolder = value.type === "folder";
  const LabelIcon = treeItemIcons[value.type];
  const collapseIcon = isFolder ? <FolderOpenIcon /> : <LabelIcon />;
  const expandIcon = isFolder ? <FolderClosedIcon /> : <LabelIcon />;
  return {
    collapseIcon,
    expandIcon,
    label: value.name,
  };
}

const treeItemIcons = {
  folder: FolderIcon,
  entity: EntityDefinitionIcon,
  component: ComponentDefinitionIcon,
};

const treeOptions: CreateTreeOptions<TypedLibraryNode, LibraryNodeId> = {
  compareFn: compareLibraryTreeNodes,
  getId: (node) => node.nodeId,
  getParentId: (node) => node.parentNodeId,
};

const getInitialExpanded = (nodes: TypedLibraryNode[]) =>
  nodes.filter((n) => n.type === "folder" && !n.parentNodeId);
