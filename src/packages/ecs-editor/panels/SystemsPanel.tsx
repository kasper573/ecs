import { IconButton, Tooltip } from "@material-ui/core";
import React, { useContext } from "react";
import { PanelHeader } from "../components/PanelHeader";
import { AddIcon, SystemIcon } from "../icons";
import { useDispatch, useSelector } from "../store";
import { selectListOfSystemDefinition } from "../selectors/selectListOfSystemDefinition";
import { CrudList } from "../components/CrudList";
import { core } from "../core";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { uuid } from "../../ecs-common/uuid";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { useDialog } from "../hooks/useDialog";
import { NameDialog } from "../components/NameDialog";
import { DeleteDialog } from "../components/DeleteDialog";

export const SystemsPanel = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const systems = useSelector(selectListOfSystemDefinition);
  const nativeComponents = useContext(NativeComponentsContext);
  const dispatch = useDispatch();

  const showCreateDialog = useDialog((props) => (
    <NameDialog {...props} title={`New system`} onSave={handleCreate} />
  ));

  const showRenameDialog = useDialog((props, system: SystemDefinition) => (
    <NameDialog
      {...props}
      title={`Rename ${system.name}`}
      defaultValue={system.name}
      onSave={(name) => handleRename(system, name)}
    />
  ));

  const showDeleteDialog = useDialog((props, system: SystemDefinition) => (
    <DeleteDialog
      {...props}
      name={system.name}
      onDelete={() => handleDelete(system)}
    />
  ));

  function handleCreate(name: string) {
    const system: SystemDefinition = { id: uuid(), name };
    dispatch(core.actions.createSystemDefinition(system));
    addNativeComponentsForSystem(system);
  }

  function handleRename(system: SystemDefinition, name: string) {
    dispatch(
      core.actions.renameSystemDefinition({ systemId: system.id, name })
    );
  }

  function handleSelected(system: SystemDefinition) {
    dispatch(core.actions.setSelectedSystemDefinition(system.id));
  }

  function handleDelete(system: SystemDefinition) {
    dispatch(core.actions.deleteSystemDefinition(system.id));
  }

  function addNativeComponentsForSystem(system: SystemDefinition) {
    for (const nativeComponentName of Object.keys(nativeComponents)) {
      dispatch(
        core.actions.createComponentDefinition({
          nodeId: uuid(),
          id: uuid(),
          systemId: system.id,
          name: nativeComponentName,
          nativeComponent: nativeComponentName,
        })
      );
    }
  }

  return (
    <>
      <PanelHeader title="Systems">
        <Tooltip title="New system">
          <IconButton
            edge="end"
            aria-label="New system"
            onClick={showCreateDialog}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </PanelHeader>
      <CrudList
        active={selectedSystem}
        items={systems}
        onSelectItem={handleSelected}
        getItemProps={getItemProps}
        getItemKey={getItemKey}
        onUpdateItem={showRenameDialog}
        onDeleteItem={showDeleteDialog}
      />
    </>
  );
};

const getItemKey = ({ id }: SystemDefinition) => id;

const getItemProps = ({ name }: SystemDefinition) => ({
  name,
  icon: SystemIcon,
});
