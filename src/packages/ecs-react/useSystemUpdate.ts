import { useEffect } from "react";
import { System } from "../ecs/System";
import { useAsRef } from "../ecs-common/useAsRef";

/**
 * Calls the update function whenever the specified system changes or updates.
 */
export const useSystemUpdate = (system?: System, update = () => {}) => {
  // No need to refresh the effect when the update function changes.
  // We store it and keep it updated as ref and always use the latest update function.
  // This reduces the number of times we modify the system module list.
  const updateFnRef = useAsRef(update);
  useEffect(() => {
    const updateModule = { update: () => updateFnRef.current() };
    if (system) {
      system.modules.push(updateModule);
    }
    return () => {
      if (system) {
        system.modules.remove(updateModule);
      }
    };
  }, [system, updateFnRef]);
};
