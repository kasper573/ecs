import { EditorState } from "../types/EditorState";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";

/**
 * Update the specified system with a partial update
 */
export const updateSystem = (
  state: EditorState,
  system: SystemDefinition,
  update: Partial<SystemDefinition>
): EditorState => {
  const index = state.systems.indexOf(system);
  const updatedSystems = state.systems.slice();
  updatedSystems[index] = { ...system, ...update };
  return {
    ...state,
    systems: updatedSystems,
  };
};
