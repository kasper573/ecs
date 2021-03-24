import { useEffect, useState } from "react";
import { System } from "../../ecs/System";
import { createSystem } from "../../ecs-serializable/factories/createSystem";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { useSelector } from "../store";

/**
 * Automates system initialization (Initializes a System using a SystemDefinition).
 * Creates a new System instance whenever `selected.system` changes.
 * Will use the `selected.scene` as initial scene in each new System instance.
 *
 * Returns the most recent System instance and a function to trigger the system reinitialization manually.
 */
export const useSystemInitializer = (nativeComponents: NativeComponents) => {
  const [system, setSystem] = useState<System>();
  const { ecs, selection } = useSelector((state) => state);

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
