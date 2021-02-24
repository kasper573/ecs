import { EditorState } from "../types/EditorState";
import { SerializedSystem } from "../types/SerializedSystem";

/**
 * Update the specified system with a partial update
 */
export const updateSystem = (
  state: EditorState,
  system: SerializedSystem,
  update: Partial<SerializedSystem>
): EditorState => {
  const index = state.systems.indexOf(system);
  const updatedSystems = state.systems.slice();
  updatedSystems[index] = { ...system, ...update };
  return {
    ...state,
    systems: updatedSystems,
  };
};
