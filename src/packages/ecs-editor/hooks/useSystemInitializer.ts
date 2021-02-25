import { useEffect, useState } from "react";
import { System } from "../../ecs/System";
import { initializeSystem } from "../functions/initializeSystem";
import { EditorObjects } from "../types/EditorObjects";
import { useAsRef } from "../../use-as-ref/useAsRef";

/**
 * Automates system initialization (Initializes a System using a SerializedSystem).
 * Creates a new System instance whenever `selected.system` changes.
 * Will use the `selected.scene` as initial scene in each new System instance.
 *
 * Returns the most recent System instance and a function to trigger the system reinitialization manually.
 */
export const useSystemInitializer = (selected: EditorObjects) => {
  const [system, setSystem] = useState<System>();
  const selectedSceneNameRef = useAsRef(selected.scene?.name);

  const resetSystem = () => {
    if (selected.system) {
      setSystem(
        initializeSystem(selected.system, selectedSceneNameRef.current)
      );
    }
  };

  useEffect(resetSystem, [selected.system, selectedSceneNameRef]);

  return [system, resetSystem] as const;
};
