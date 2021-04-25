import { createContext, useContext, useEffect, useState } from "react";
import { createSystem } from "../../../ecs-serializable/src/functions/createSystem";
import { useRootSelector, useSelector } from "../store";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { updateSystem } from "../../../ecs-serializable/src/functions/updateSystem";
import { getECSDefinitionForSystem } from "../../../ecs-serializable/src/functions/getECSDefinitionForSystem";
import { useAsRef } from "../../../ecs-common/src/useAsRef";
import { DeserializationMemory } from "../../../ecs-serializable/src/DeserializationMemory";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { NativeComponents } from "../../../ecs-serializable/src/types/NativeComponents";
import { createECSDefinition } from "../../../ecs-serializable/src/functions/createECSDefinition";
import { System } from "../../../ecs/src/System";
import { selectECS } from "../selectors/selectECS";
import { selectSelectedSystemDefinitionId } from "../selectors/selectSelectedSystemDefinitionId";
import { DeserializedSystem } from "../../../ecs-serializable/src/types/DeserializedSystem";

/**
 * Automates system initialization and updates.
 */
export const useSystemSync = () => {
  const nativeComponents = useContext(NativeComponentsContext);
  const ecs = useSelector(selectECS);
  const selectedSystemId = useRootSelector(selectSelectedSystemDefinitionId);
  const [[system, memory, error], setSystemAndMemory] = useState(() =>
    createSystemWithMemory(ecs, selectedSystemId, nativeComponents)
  );
  const ref = useAsRef({ system, memory });

  const updateRuntime = () => {
    let { system, memory } = ref.current;
    let error: Error | undefined;
    try {
      updateSystem(
        system,
        getSelectedECS(ecs, selectedSystemId),
        memory,
        nativeComponents
      );
    } catch (e) {
      system = new DeserializedSystem();
      memory = new DeserializationMemory();
      error = e;
    }
    setSystemAndMemory([system, memory, error]);
  };

  const resetRuntime = () => {
    system.dispose();
    memory.clear();
    setSystemAndMemory(
      createSystemWithMemory(ecs, selectedSystemId, nativeComponents)
    );
  };

  useEffect(updateRuntime, [ecs, ref, selectedSystemId, nativeComponents]);

  return [system, resetRuntime, error] as const;
};

const getSelectedECS = (
  ecs: ECSDefinition,
  selectedSystem?: SystemDefinitionId
) =>
  selectedSystem
    ? getECSDefinitionForSystem(ecs, selectedSystem)
    : createECSDefinition();

const createSystemWithMemory = (
  ecs: ECSDefinition,
  selectedSystem: SystemDefinitionId | undefined,
  nativeComponents: NativeComponents
) => {
  let memory = new DeserializationMemory();
  let system: DeserializedSystem;
  let error: Error | undefined;
  try {
    system = createSystem(
      getSelectedECS(ecs, selectedSystem),
      memory,
      nativeComponents
    );
  } catch (e) {
    system = new DeserializedSystem();
    memory = new DeserializationMemory();
    error = e;
  }
  return [system, memory, error] as const;
};

export const SystemSyncContext = createContext<
  readonly [System, () => void, Error | undefined]
>([new System(), () => {}, undefined]);
