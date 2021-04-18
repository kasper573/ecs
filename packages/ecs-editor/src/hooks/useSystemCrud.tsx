import { useContext } from "react";
import { core } from "../core";
import { uuid } from "../../../ecs-common/src/uuid";
import { SystemDefinition } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { useDispatch, useStore } from "../store";
import { EntityInitializerId } from "../../../ecs-serializable/src/definition/EntityInitializer";
import { createDeleteSystemDefinitionAction } from "../actions/createDeleteSystemDefinitionAction";
import { useCrudDialogs } from "./useCrudDialogs";

export const useSystemCrud = () => {
  const store = useStore();
  const nativeComponents = useContext(NativeComponentsContext);
  const dispatch = useDispatch();

  const [showDialogs] = useCrudDialogs<SystemDefinition>(
    "system",
    (system) => system.name,
    {
      create: handleCreate,
      remove: (system) => {
        for (const action of createDeleteSystemDefinitionAction(
          system.id,
          store
        )) {
          dispatch(action);
        }
      },
      rename: (system, name) =>
        dispatch(
          core.actions.renameSystemDefinition({ systemId: system.id, name })
        ),
    }
  );

  function handleCreate(name: string) {
    const system: SystemDefinition = { id: uuid(), name };
    const entity = {
      id: uuid() as EntityInitializerId,
      systemId: system.id,
      name: "Empty",
      components: [],
    };
    dispatch(core.actions.createSystemDefinition(system));
    addNativeComponentsForSystem(system);
    dispatch(core.actions.createEntityInitializer(entity));
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

  return showDialogs;
};
