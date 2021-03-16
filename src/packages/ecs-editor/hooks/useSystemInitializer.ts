import { useEffect, useState } from "react";
import { System } from "../../ecs/System";
import { createSystem } from "../../ecs-serializable/factories/createSystem";
import { useAsRef } from "../../use-as-ref/useAsRef";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { EditorSelectionObjects } from "../types/EditorSelection";

/**
 * Automates system initialization (Initializes a System using a SystemDefinition).
 * Creates a new System instance whenever `selected.system` changes.
 * Will use the `selected.scene` as initial scene in each new System instance.
 *
 * Returns the most recent System instance and a function to trigger the system reinitialization manually.
 */
export const useSystemInitializer = (
  selected: Partial<EditorSelectionObjects>,
  nativeComponents: NativeComponents
) => {
  const [system, setSystem] = useState<System>();
  const selectedSceneNameRef = useAsRef(selected.scene?.name);

  const resetSystem = () => {
    if (selected.system) {
      setSystem(
        createSystem(
          selected.system,
          nativeComponents,
          selectedSceneNameRef.current
        )
      );
    }
  };

  useEffect(resetSystem, [
    selected.system,
    selectedSceneNameRef,
    nativeComponents,
  ]);

  return [system, resetSystem] as const;
};
