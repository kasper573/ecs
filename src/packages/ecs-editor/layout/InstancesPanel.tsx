import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { core } from "../core";
import { useDispatch, useSelector, useStore } from "../store";
import { selectListOfEntityInitializer } from "../selectors/selectListOfEntityInitializer";
import {
  AddIcon,
  EntityContainerOpenIcon,
  EntityInitializerIcon,
  EntityContainerClosedIcon,
} from "../icons";
import { Panel } from "../components/Panel";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { selectSelectedEntityInitializer } from "../selectors/selectSelectedEntityInitializer";
import {
  EntityDefinition,
  EntityDefinitionId,
} from "../../ecs-serializable/types/EntityDefinition";
import { uuid } from "../../ecs-common/uuid";
import { DropBox } from "../components/DropBox";
import { entityDefinitionDropSpec } from "../dnd/entityDefinitionDropSpec";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { selectECS } from "../selectors/selectECS";
import { CommonTreeView } from "../components/CommonTreeView";
import { CreateTreeOptions } from "../tree/createTree";
import { entityInitializerDragSpec } from "../dnd/entityInitializerDragSpec";
import { entityInitializerDropSpec } from "../dnd/entityInitializerDropSpec";
import { createEntityInitializerMenuFactory } from "../functions/createEntityInitializerMenuFactory";
import { MenuFor } from "../components/MenuFor";
import { useContextMenu } from "../hooks/useContextMenu";
import { TreeNode } from "../tree/TreeNode";

export const InstancesPanel = () => {
  const { entityDefinitions } = useSelector(selectECS);
  const selectedEntity = useSelector(selectSelectedEntityInitializer);
  const entities = useSelector(selectListOfEntityInitializer);
  const dispatch = useDispatch();
  const store = useStore();

  const [{ showRenameDialog, showDeleteDialog }] = useCrudDialogs(
    "instance",
    (instance) => instance.name,
    {
      rename: handleRename,
      remove: handleDelete,
    }
  );

  const menuItemFactory = createEntityInitializerMenuFactory(
    Object.values(entityDefinitions),
    handleInitializeEmpty,
    handleInitialize,
    showRenameDialog,
    handleDuplicate,
    showDeleteDialog
  );

  const [rootContextMenuProps, rootContextMenu] = useContextMenu(
    menuItemFactory.common
  );

  function handleDelete(entityInitializer: EntityInitializer) {
    dispatch(core.actions.deleteEntityInitializer(entityInitializer.id));
  }

  function handleDuplicate(entityInitializer: EntityInitializer) {
    dispatch(core.actions.duplicateEntityInitializer(entityInitializer.id));
  }

  function handleSelected(entityInitializer: EntityInitializer) {
    dispatch(core.actions.setSelectedEntityInitializer(entityInitializer.id));
  }

  function handleRename(entity: EntityInitializer, name: string) {
    dispatch(
      core.actions.renameEntityInitializer({
        entityId: entity.id,
        name,
      })
    );
  }

  function handleInitializeEmpty(parentId?: EntityInitializerId) {
    handleInitialize(undefined, parentId);
  }

  function handleInitialize(
    entityDefinition?: EntityDefinition,
    parentId?: EntityInitializerId
  ) {
    const { system } = store.getState().present.selection;
    dispatch(
      core.actions.createEntityInitializer({
        systemId: system!,
        id: uuid(),
        parentId,
        name: entityDefinition?.name ?? "Empty",
        definitionId: entityDefinition?.id,
        components: [],
      })
    );
  }

  function handleMoveEntity(
    entity: EntityInitializer,
    target?: EntityInitializer
  ) {
    dispatch(
      core.actions.moveEntityInitializer({
        id: entity.id,
        targetId: target?.id,
      })
    );
  }

  return (
    <Panel name={PanelName.Instances} {...rootContextMenuProps}>
      {rootContextMenu}
      <PanelHeader title={PanelName.Instances}>
        <MenuFor items={menuItemFactory.create}>
          {(props) => (
            <Tooltip title="New">
              <IconButton edge="end" aria-label="New" {...props}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </MenuFor>
      </PanelHeader>
      <CommonTreeView
        nodes={entities}
        selected={selectedEntity}
        initialExpanded={getInitialExpanded}
        onSelectedChange={handleSelected}
        treeOptions={treeOptions}
        itemProps={{
          menuItems: menuItemFactory.entity,
          onMoveNode: handleMoveEntity,
          treeItemProps: (node) => getItemProps(node, entityDefinitions),
          dragSpec: entityInitializerDragSpec,
          dropSpec: (entity, onDrop) =>
            entityInitializerDropSpec(
              entity,
              onDrop,
              () => store.getState().present
            ),
        }}
      >
        <DropBox spec={entityDefinitionDropSpec(handleInitialize)}>
          <Typography>Drop to create instance</Typography>
        </DropBox>
      </CommonTreeView>
    </Panel>
  );
};

function getItemProps(
  { value: { name, definitionId }, children }: TreeNode<EntityInitializer>,
  definitions: Record<EntityDefinitionId, EntityDefinition>
) {
  const definitionName = definitionId && definitions[definitionId]?.name;
  const displayName =
    definitionName && definitionName !== name
      ? `${name} (${definitionName})`
      : name;
  const isContainer = children.length > 0;
  const collapseIcon = isContainer ? (
    <EntityContainerOpenIcon />
  ) : (
    <EntityInitializerIcon />
  );
  const expandIcon = isContainer ? (
    <EntityContainerClosedIcon />
  ) : (
    <EntityInitializerIcon />
  );
  return {
    collapseIcon,
    expandIcon,
    label: displayName,
  };
}

const treeOptions: CreateTreeOptions<EntityInitializer, EntityInitializerId> = {
  getId: (entity) => entity.id,
  getParentId: (entity) => entity.parentId,
};

const getInitialExpanded = (entities: EntityInitializer[]) =>
  entities.filter((entity) => !entity.parentId);
