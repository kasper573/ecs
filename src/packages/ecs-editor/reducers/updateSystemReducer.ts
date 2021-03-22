import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../../ecs-serializable/types/SystemDefinition";
import { requireSystem } from "../selectors/requireSystem";

export const updateSystemReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  update: Partial<SystemDefinition>;
}> = (state, { systemId, update }) => {
  const system = requireSystem(state, systemId);
  const updatedSystems = state.systems.slice();
  const index = state.systems.indexOf(system);
  updatedSystems[index] = { ...system, ...update };
  return {
    ...state,
    systems: updatedSystems,
  };
};
