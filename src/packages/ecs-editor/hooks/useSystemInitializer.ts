import { useContext, useEffect, useState } from "react";
import { System } from "../../ecs/System";
import { createSystem } from "../../ecs-serializable/factories/createSystem";
import { useSelector } from "../store";
import { selectAll } from "../selectors/selectAll";
import { NativeComponentsContext } from "../NativeComponentsContext";

/**
 * Automates system initialization (Initializes a System using a SystemDefinition).
 * Creates a new System instance whenever `selected.system` changes.
 * Will use the `selected.scene` as initial scene in each new System instance.
 *
 * Returns the most recent System instance and a function to trigger the system reinitialization manually.
 */
export const useSystemInitializer = () => {
  const [system, setSystem] = useState<System>();
  const { ecs, selection } = useSelector(selectAll);
  const nativeComponents = useContext(NativeComponentsContext);

  const resetSystem = () => {
    if (selection.system) {
      setSystem(
        createSystem(ecs, nativeComponents, selection.system, selection.scene)
      );
    }
  };

  useEffect(resetSystem, [ecs, selection, nativeComponents]);

  return [system, resetSystem] as const;
};
