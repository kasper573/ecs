import { IconButton, Tooltip } from "@material-ui/core";
import React, { useCallback, useContext } from "react";
import { PanelHeader } from "../components/PanelHeader";
import { AddIcon, SystemIcon } from "../components/icons";
import { useDispatch, useSelector } from "../store";
import { selectListOfSystemDefinition } from "../selectors/selectListOfSystemDefinition";
import { CrudList } from "../components/CrudList";
import { omit } from "../../ecs-common/omit";
import { core } from "../core";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { uuid } from "../../ecs-common/uuid";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { NativeComponentsContext } from "../NativeComponentsContext";

export const SystemsPanel = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const systems = useSelector(selectListOfSystemDefinition);
  const nativeComponents = useContext(NativeComponentsContext);
  const dispatch = useDispatch();
  const [systemEvents, systemDialogs] = useCrudDialogs<SystemDefinition>({
    createDialogTitle: "Add system",
    getItemName: (item) => item.name,
    onCreateItem: (name) => {
      const system: SystemDefinition = { id: uuid(), name };
      dispatch(core.actions.createSystemDefinition(system));
      addNativeComponentsForSystem(system);
    },
    onRenameItem: (system, name) =>
      dispatch(
        core.actions.renameSystemDefinition({ systemId: system.id, name })
      ),
    onDeleteItem: (system) =>
      dispatch(core.actions.deleteSystemDefinition(system.id)),
  });

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

  const handleSystemSelected = useCallback(
    (system) => dispatch(core.actions.setSelectedSystemDefinition(system.id)),
    [dispatch]
  );

  return (
    <>
      {systemDialogs}
      <PanelHeader title="Systems">
        <Tooltip title="Add system">
          <IconButton
            edge="end"
            aria-label="add system"
            onClick={systemEvents.onCreateItem}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </PanelHeader>
      <CrudList
        active={selectedSystem}
        items={systems}
        onSelectItem={handleSystemSelected}
        getItemProps={getItemProps}
        getItemKey={getItemKey}
        {...omit(systemEvents, "onCreateItem")}
      />
    </>
  );
};

const getItemKey = ({ id }: SystemDefinition) => id;

const getItemProps = ({ name }: SystemDefinition) => ({
  name,
  icon: SystemIcon,
});
