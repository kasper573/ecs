import { EditorState } from "../types/EditorState";
import { DefinitionLibrary } from "../../ecs-serializable/types/DefinitionLibrary";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { updateSystem } from "./updateSystem";

/**
 * Update the specified system library with a partial update
 */
export const updateLibrary = (
  state: EditorState,
  system: SystemDefinition | undefined,
  getUpdate: (current: DefinitionLibrary) => Partial<DefinitionLibrary>
): EditorState => {
  if (!system) {
    return state;
  }
  return updateSystem(state, system, {
    library: {
      ...system.library,
      ...getUpdate(system.library),
    },
  });
};
