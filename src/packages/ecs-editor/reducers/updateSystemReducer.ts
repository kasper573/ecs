import { EditorStateReducer } from "../types/EditorStateReducer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";

export const updateSystemReducer: EditorStateReducer<{
  system: SystemDefinition;
  update: Partial<SystemDefinition>;
}> = (state, { system, update }) => {
  const index = state.systems.indexOf(system);
  const updatedSystems = state.systems.slice();
  updatedSystems[index] = { ...system, ...update };
  return {
    ...state,
    systems: updatedSystems,
  };
};
