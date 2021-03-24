import { EditorStateReducer } from "../types/EditorStateReducer";
import { get, set } from "../../nominal";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../../ecs-serializable/types/SystemDefinition";

export const updateSystemReducer: EditorStateReducer<{
  systemId: SystemDefinitionId;
  update: Partial<SystemDefinition>;
}> = ({ ecs: { systems } }, { payload: { systemId, update } }) => {
  const system = get(systems, systemId);
  if (!system) {
    throw new Error("System not found");
  }
  set(systems, systemId, { ...system, ...update });
};
