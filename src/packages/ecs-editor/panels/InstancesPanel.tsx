import React, { useCallback } from "react";
import { PanelName } from "../components/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { CreateEntityInitializerButton } from "../components/CreateEntityInitializerButton";
import { core } from "../core";
import { useDispatch, useSelector } from "../store";
import { selectListOfEntityInitializer } from "../selectors/selectListOfEntityInitializer";
import { CrudList } from "../components/CrudList";
import { EntityInitializerIcon } from "../components/icons";
import { omit } from "../../ecs-common/omit";
import { Panel } from "../components/Panel";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { selectSelectedEntityInitializer } from "../selectors/selectSelectedEntityInitializer";

export const InstancesPanel = () => {
  const selectedEntity = useSelector(selectSelectedEntityInitializer);
  const entities = useSelector(selectListOfEntityInitializer);
  const dispatch = useDispatch();
  const [
    entityInitializerEvents,
    entityInitializerDialogs,
  ] = useCrudDialogs<EntityInitializer>({
    createDialogTitle: "Initialize entity",
    getItemName: (item) => item.name,
    onCreateItem: () => {},
    onRenameItem: (entity, name) =>
      dispatch(
        core.actions.updateEntityInitializer({
          entityId: entity.id,
          update: { name },
        })
      ),
    onDeleteItem: (entity) =>
      dispatch(core.actions.deleteEntityInitializer(entity.id)),
  });
  const handleNodeSelected = useCallback(
    (entityInitializer) =>
      dispatch(core.actions.setSelectedEntityInitializer(entityInitializer.id)),
    [dispatch]
  );
  return (
    <Panel name={PanelName.Instances}>
      {entityInitializerDialogs}
      <PanelHeader title={PanelName.Instances}>
        <CreateEntityInitializerButton
          onCreate={(entityInitializer) =>
            dispatch(core.actions.createEntityInitializer(entityInitializer))
          }
        />
      </PanelHeader>
      <CrudList
        active={selectedEntity}
        items={entities}
        getItemProps={getItemProps}
        getItemKey={getItemKey}
        onSelectItem={handleNodeSelected}
        {...omit(entityInitializerEvents, "onCreateItem")}
      />
    </Panel>
  );
};

const getItemKey = ({ id }: EntityInitializer) => id;

const getItemProps = ({ name }: EntityInitializer) => ({
  name,
  icon: EntityInitializerIcon,
});
