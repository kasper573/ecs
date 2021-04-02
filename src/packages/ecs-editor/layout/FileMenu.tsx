import React, { useContext } from "react";
import { Button, Dialog, DialogTitle, MenuItem } from "@material-ui/core";
import { SystemIcon } from "../icons";
import { useDispatch, useSelector } from "../store";
import { selectListOfSystemDefinition } from "../selectors/selectListOfSystemDefinition";
import { CrudList } from "../components/CrudList";
import { core } from "../core";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { uuid } from "../../ecs-common/uuid";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { MenuFor } from "../components/MenuFor";
import { useDialog } from "../hooks/useDialog";
import { combine } from "../../ecs-common/combine";

export const FileMenu = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const systems = useSelector(selectListOfSystemDefinition);
  const nativeComponents = useContext(NativeComponentsContext);
  const dispatch = useDispatch();

  const [{ showCreateDialog }] = useCrudDialogs<SystemDefinition>(
    "system",
    (system) => system.name,
    { create: handleCreate }
  );

  function handleCreate(name: string) {
    const system: SystemDefinition = { id: uuid(), name };
    dispatch(core.actions.createSystemDefinition(system));
    addNativeComponentsForSystem(system);
    dispatch(core.actions.setSelectedSystemDefinition(system.id));
  }

  function handleSelected(system: SystemDefinition) {
    dispatch(core.actions.setSelectedSystemDefinition(system.id));
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

  const showSystemDialog = useDialog((props) => {
    const close = () =>
      props.onClose ? props.onClose({}, "backdropClick") : undefined;
    return (
      <Dialog {...props} fullWidth maxWidth="xs">
        <DialogTitle>Select system</DialogTitle>
        <CrudList
          active={selectedSystem}
          items={systems}
          getItemProps={getItemProps}
          getItemKey={getItemKey}
          onSelectItem={combine(handleSelected, close)}
        />
      </Dialog>
    );
  });

  return (
    <MenuFor
      items={[
        <MenuItem onClick={showCreateDialog}>New system</MenuItem>,
        systems.length > 0 && (
          <MenuItem onClick={showSystemDialog}>Select system</MenuItem>
        ),
      ]}
    >
      {(props) => (
        <Button
          aria-label="File"
          color="primary"
          variant="contained"
          {...props}
        >
          File
        </Button>
      )}
    </MenuFor>
  );
};

const getItemKey = ({ id }: SystemDefinition) => id;

const getItemProps = ({ name }: SystemDefinition) => ({
  name,
  icon: SystemIcon,
});
