import { Typography } from "@material-ui/core";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { CreateEntityInitializerButton } from "../buttons/CreateEntityInitializerButton";
import { core } from "../core";
import { useDispatch, useSelector, useStore } from "../store";
import { selectListOfEntityInitializer } from "../selectors/selectListOfEntityInitializer";
import { CrudList } from "../components/CrudList";
import { EntityInitializerIcon } from "../icons";
import { Panel } from "../components/Panel";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
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

export const InstancesPanel = () => {
  const { entityDefinitions } = useSelector(selectECS);
  const selectedEntity = useSelector(selectSelectedEntityInitializer);
  const entities = useSelector(selectListOfEntityInitializer);
  const dispatch = useDispatch();
  const store = useStore();

  const [{ showRenameDialog, showDeleteDialog, createTitle }] = useCrudDialogs(
    "instance",
    (instance) => instance.name,
    {
      rename: handleRename,
      remove: handleDelete,
    }
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

  function handleInitialize(entityDefinition: EntityDefinition) {
    const { system } = store.getState().present.selection;
    dispatch(
      core.actions.createEntityInitializer({
        systemId: system!,
        id: uuid(),
        name: entityDefinition.name,
        definitionId: entityDefinition.id,
        components: [],
      })
    );
  }

  return (
    <Panel name={PanelName.Instances}>
      <PanelHeader title={PanelName.Instances}>
        <CreateEntityInitializerButton
          title={createTitle}
          onCreate={handleInitialize}
        />
      </PanelHeader>
      <CrudList
        active={selectedEntity}
        items={entities}
        getItemProps={(item) => getItemProps(item, entityDefinitions)}
        getItemKey={getItemKey}
        onSelectItem={handleSelected}
        onDuplicateItem={handleDuplicate}
        onUpdateItem={showRenameDialog}
        onDeleteItem={showDeleteDialog}
      />
      <DropBox spec={entityDefinitionDropSpec(handleInitialize)}>
        <Typography>Drop to create instance</Typography>
      </DropBox>
    </Panel>
  );
};

const getItemKey = ({ id }: EntityInitializer) => id;

const getItemProps = (
  { name, definitionId }: EntityInitializer,
  definitions: Record<EntityDefinitionId, EntityDefinition>
) => {
  const definitionName = definitions[definitionId]?.name;
  const displayName =
    definitionName === name ? name : `${name} (${definitionName})`;
  return {
    name: displayName,
    icon: EntityInitializerIcon,
  };
};
