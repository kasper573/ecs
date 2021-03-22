import { EditorState } from "../types/EditorState";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

export const requireSystem = (
  state: EditorState,
  systemId: SystemDefinitionId
) => {
  const system = state.systems.find(({ id }) => id === systemId);
  if (!system) {
    throw new Error(`System not found in state`);
  }
  return system;
};
