import { IconButton, Tooltip } from "@material-ui/core";
import { memo, useContext } from "react";
import { shallowEqual } from "react-redux";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { core } from "../core";
import { useDispatch, useSelector, useStore } from "../store";
import { selectListOfEntityInitializer } from "../selectors/selectListOfEntityInitializer";
import {
  AddIcon,
  EntityContainerClosedIcon,
  EntityContainerOpenIcon,
  EntityInitializerIcon,
} from "../icons";
import { Panel } from "../components/Panel";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/definition/EntityInitializer";
import { selectSelectedEntityInitializer } from "../selectors/selectSelectedEntityInitializer";
import { EntityDefinition } from "../../ecs-serializable/definition/EntityDefinition";
import { uuid } from "../../ecs-common/uuid";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { CommonTreeView } from "../components/CommonTreeView";
import { CreateTreeOptions } from "../tree/createTree";
import { entityInitializerDragSpec } from "../dnd/entityInitializerDragSpec";
import {
  EntityInitializerDropObjectTyped,
  entityInitializerDropSpec,
} from "../dnd/entityInitializerDropSpec";
import { createEntityInitializerMenuFactory } from "../functions/createEntityInitializerMenuFactory";
import { MenuFor } from "../components/MenuFor";
import { useContextMenu } from "../hooks/useContextMenu";
import { TreeNode } from "../tree/TreeNode";
import { selectListOfEntityDefinition } from "../selectors/selectListOfEntityDefinition";
import { Intro } from "../intro/Intro";
import { useSystemSelector } from "../hooks/useSystemSelector";
import { SystemSyncContext } from "../hooks/useSystemSync";
import { getRuntimeEntityActiveStates } from "../functions/getRuntimeEntityActiveStates";
import { compareEntityInitializers } from "../functions/compareEntityInitializers";
import { DNDType } from "../dnd/DNDType";

export const HierarchyPanel = memo(() => {
  const [system] = useContext(SystemSyncContext);
  const entityDefinitions = useSelector(selectListOfEntityDefinition);
  const selectedEntity = useSelector(selectSelectedEntityInitializer);
  const entities = useSelector(selectListOfEntityInitializer);
  const dispatch = useDispatch();
  const store = useStore();
  const isRuntimeActive = useSystemSelector(
    system,
    getRuntimeEntityActiveStates,
    shallowEqual
  );

  const [{ showRenameDialog, showDeleteDialog }] = useCrudDialogs(
    "instance",
    (instance) => instance.name,
    {
      rename: handleRename,
      remove: handleDelete,
    }
  );

  const menuItemFactory = createEntityInitializerMenuFactory(
    entityDefinitions,
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
    parentId?: EntityInitializerId,
    order?: number
  ) {
    const { system } = store.getState().present.selection;
    const id: EntityInitializerId = uuid();
    dispatch(
      core.actions.createEntityInitializer({
        systemId: system!,
        id,
        parentId,
        order,
        name: entityDefinition?.name ?? "Empty",
        definitionId: entityDefinition?.id,
        components: [],
      })
    );
    dispatch(core.actions.setSelectedEntityInitializer(id));
  }

  function handleDropEntity(
    dropped: EntityInitializerDropObjectTyped,
    target?: EntityInitializer,
    order?: number
  ) {
    if (dropped.type === DNDType.EntityDefinition) {
      return handleInitialize(dropped.definition, target?.id, order);
    }

    dispatch(
      core.actions.moveEntityInitializer({
        id: dropped.initializer.id,
        targetId: target?.id,
        order,
      })
    );

    dispatch(core.actions.setSelectedEntityInitializer(dropped.initializer.id));
  }

  return (
    <Panel name={PanelName.Hierarchy} {...rootContextMenuProps}>
      {rootContextMenu}
      <PanelHeader
        title={
          <Intro
            introId="WhatIsTheHierarchy"
            message={
              "The Hierarchy represents what objects (entities) your system contains. " +
              "Click an entity to inspect it. " +
              "You can also drag to move, and right click to rename or delete entities."
            }
          >
            <span>{PanelName.Hierarchy}</span>
          </Intro>
        }
      >
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
          faded: (entity) => !isRuntimeActive[entity.id],
          menuItems: menuItemFactory.entity,
          treeItemProps: getItemProps,
          dndDivider: true,
          dragSpec: entityInitializerDragSpec,
          dropSpec: (target, order) =>
            entityInitializerDropSpec(
              target,
              (dropped) => handleDropEntity(dropped, target, order),
              () => store.getState().present
            ),
        }}
      />
    </Panel>
  );
});

function getItemProps({
  value: { name },
  children,
}: TreeNode<EntityInitializer>) {
  const y = children.length > 0;
  const collapse = y ? <EntityContainerOpenIcon /> : <EntityInitializerIcon />;
  const expand = y ? <EntityContainerClosedIcon /> : <EntityInitializerIcon />;
  return {
    collapseIcon: collapse,
    expandIcon: expand,
    label: name,
  };
}

const treeOptions: CreateTreeOptions<EntityInitializer, EntityInitializerId> = {
  compareFn: (a, b) => compareEntityInitializers(a.value, b.value),
  getId: (entity) => entity.id,
  getParentId: (entity) => entity.parentId,
};

const getInitialExpanded = (entities: EntityInitializer[]) =>
  entities.filter((entity) => !entity.parentId);
