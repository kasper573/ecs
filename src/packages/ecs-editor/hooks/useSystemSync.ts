import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { System } from "../../ecs/System";
import { createSystem } from "../../ecs-serializable/functions/createSystem";
import { useSelector } from "../store";
import { selectAll } from "../selectors/selectAll";
import { NativeComponentsContext } from "../NativeComponentsContext";
import { updateSystem } from "../../ecs-serializable/functions/updateSystem";
import { getECSDefinitionForSystem } from "../../ecs-serializable/functions/getECSDefinitionForSystem";
import { useAsRef } from "../../ecs-common/useAsRef";

/**
 * Automates system initialization and updates.
 */
export const useSystemSync = () => {
  const nativeComponents = useContext(NativeComponentsContext);
  const { ecs, selection } = useSelector(selectAll);
  const [system, setSystem] = useState<System>();
  const [, forceUpdate] = useReducer((n) => n + 1, 0);
  const systemRef = useAsRef(system);

  const syncSystem = () => {
    if (!selection.system) {
      if (systemRef.current) {
        setSystem(undefined);
      }
      return;
    }
    const selectedECS = getECSDefinitionForSystem(ecs, selection.system);
    if (!systemRef.current) {
      setSystem(createSystem(selectedECS, nativeComponents));
      return;
    }
    updateSystem(systemRef.current, selectedECS, nativeComponents);
    forceUpdate();
  };

  const resetSystem = useCallback(() => {
    if (selection.system) {
      const selectedECS = getECSDefinitionForSystem(ecs, selection.system);
      setSystem(createSystem(selectedECS, nativeComponents));
    }
  }, [ecs, selection.system, nativeComponents]);

  useEffect(syncSystem, [ecs, selection.system, nativeComponents, systemRef]);

  return [system, resetSystem] as const;
};
