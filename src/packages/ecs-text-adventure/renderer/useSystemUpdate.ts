import { useEffect } from "react";
import { System } from "../../ecs/System";

/**
 * Calls the update function whenever the specified system changes or updates.
 */
export const useSystemUpdate = (system?: System, update = () => {}) => {
  useEffect(() => {
    system?.events.on("update", update);
    return () => {
      system?.events.off("update", update);
    };
  }, [system, update]);
};
