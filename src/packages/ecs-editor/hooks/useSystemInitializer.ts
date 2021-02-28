import { useEffect, useState } from "react";
import { System } from "../../ecs/System";
import { instantiateSystem } from "../../ecs-serializable/functions/instantiateSystem";
import { EditorObjects } from "../types/EditorObjects";
import { useAsRef } from "../../use-as-ref/useAsRef";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";

/**
 * Automates system initialization (Initializes a System using a SystemDefinition).
 * Creates a new System instance whenever `selected.system` changes.
 * Will use the `selected.scene` as initial scene in each new System instance.
 *
 * Returns the most recent System instance and a function to trigger the system reinitialization manually.
 */
export const useSystemInitializer = <
  AvailableComponents extends NativeComponents
>(
  selected: Partial<EditorObjects>,
  availableComponents: AvailableComponents
) => {
  const [system, setSystem] = useState<System>();
  const selectedSceneNameRef = useAsRef(selected.scene?.name);

  const resetSystem = () => {
    if (selected.system) {
      setSystem(
        instantiateSystem(
          selected.system,
          availableComponents,
          selectedSceneNameRef.current
        )
      );
    }
  };

  useEffect(resetSystem, [
    selected.system,
    selectedSceneNameRef,
    availableComponents,
  ]);

  return [system, resetSystem] as const;
};
