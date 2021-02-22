import { EditorState } from "../types/EditorState";
import { SerializableSystem } from "../types/SerializableSystem";

/**
 * Update the specified system with a partial update
 */
export const updateSystem = (
  state: EditorState,
  system: SerializableSystem,
  update: Partial<SerializableSystem>
): EditorState => {
  const index = state.systems.indexOf(system);
  const updatedSystems = state.systems.slice();
  updatedSystems[index] = { ...system, ...update };
  return {
    ...state,
    systems: updatedSystems,
  };
};
