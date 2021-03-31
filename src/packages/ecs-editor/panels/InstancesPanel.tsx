import React, { useCallback } from "react";
import { Typography } from "@material-ui/core";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { CreateEntityInitializerButton } from "../components/CreateEntityInitializerButton";
import { core } from "../core";
import { useDispatch, useSelector, useStore } from "../store";
import { selectListOfEntityInitializer } from "../selectors/selectListOfEntityInitializer";
import { CrudList } from "../components/CrudList";
import { EntityInitializerIcon } from "../components/icons";
import { omit } from "../../ecs-common/omit";
import { Panel } from "../components/Panel";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { selectSelectedEntityInitializer } from "../selectors/selectSelectedEntityInitializer";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { uuid } from "../../ecs-common/uuid";
import { DropBox } from "../components/DropBox";
import { entityDefinitionDropSpec } from "../dnd/entityDefinitionDropSpec";

export const InstancesPanel = () => {
  const selectedEntity = useSelector(selectSelectedEntityInitializer);
  const entities = useSelector(selectListOfEntityInitializer);
  const dispatch = useDispatch();
  const store = useStore();
  const [
    entityInitializerEvents,
    entityInitializerDialogs,
  ] = useCrudDialogs<EntityInitializer>({
    createDialogTitle: "Initialize entity",
    getItemName: (item) => item.name,
    onCreateItem: () => {},
    onRenameItem: (entity, name) =>
      dispatch(
        core.actions.renameEntityInitializer({
          entityId: entity.id,
          name,
        })
      ),
    onDeleteItem: (entity) =>
      dispatch(core.actions.deleteEntityInitializer(entity.id)),
  });
  const handleDuplicate = useCallback(
    (entityInitializer: EntityInitializer) =>
      dispatch(core.actions.duplicateEntityInitializer(entityInitializer.id)),
    [dispatch]
  );
  const handleNodeSelected = useCallback(
    (entityInitializer: EntityInitializer) =>
      dispatch(core.actions.setSelectedEntityInitializer(entityInitializer.id)),
    [dispatch]
  );
  function initializeDefinition(entityDefinition: EntityDefinition) {
    const { system, scene } = store.getState().present.selection;
    dispatch(
      core.actions.createEntityInitializer({
        systemId: system!,
        sceneId: scene!,
        id: uuid(),
        name: entityDefinition.name,
        definitionId: entityDefinition.id,
        components: [],
      })
    );
  }

  return (
    <Panel name={PanelName.Instances}>
      {entityInitializerDialogs}
      <PanelHeader title={PanelName.Instances}>
        <CreateEntityInitializerButton
          onCreate={(entityDefinition) =>
            initializeDefinition(entityDefinition)
          }
        />
      </PanelHeader>
      <CrudList
        active={selectedEntity}
        items={entities}
        getItemProps={getItemProps}
        getItemKey={getItemKey}
        onSelectItem={handleNodeSelected}
        onDuplicateItem={handleDuplicate}
        {...omit(entityInitializerEvents, "onCreateItem")}
      />
      <DropBox spec={entityDefinitionDropSpec(initializeDefinition)}>
        <Typography>Drop to create instance</Typography>
      </DropBox>
    </Panel>
  );
};

const getItemKey = ({ id }: EntityInitializer) => id;

const getItemProps = ({ name }: EntityInitializer) => ({
  name,
  icon: EntityInitializerIcon,
});
