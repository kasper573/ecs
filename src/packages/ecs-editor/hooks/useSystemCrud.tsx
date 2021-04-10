import React, { useContext } from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { core } from "../core";
import { uuid } from "../../ecs-common/uuid";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { useDispatch, useSelector } from "../store";
import { CrudList } from "../components/CrudList";
import { combine } from "../../ecs-common/combine";
import { SystemIcon } from "../icons";
import { selectListOfSystemDefinition } from "../selectors/selectListOfSystemDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { useDialog } from "./useDialog";
import { useCrudDialogs } from "./useCrudDialogs";

export const useSystemCrud = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const systems = useSelector(selectListOfSystemDefinition);
  const nativeComponents = useContext(NativeComponentsContext);
  const dispatch = useDispatch();

  const [showDialogs] = useCrudDialogs<SystemDefinition>(
    "system",
    (system) => system.name,
    { create: handleCreate }
  );

  function handleCreate(name: string) {
    const system: SystemDefinition = { id: uuid(), name };
    const entity: EntityInitializer = {
      id: uuid(),
      order: 0,
      systemId: system.id,
      name: "Empty",
      components: [],
    };
    dispatch(core.actions.createSystemDefinition(system));
    addNativeComponentsForSystem(system);
    dispatch(core.actions.createEntityInitializer(entity));
    dispatch(core.actions.setSelectedSystemDefinition(system.id));
    dispatch(core.actions.setSelectedEntityInitializer(entity.id));
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

  const showSelectDialog = useDialog((props) => {
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

  return { ...showDialogs, showSelectDialog } as const;
};

const getItemKey = ({ id }: SystemDefinition) => id;

const getItemProps = ({ name }: SystemDefinition) => ({
  name,
  icon: SystemIcon,
});
