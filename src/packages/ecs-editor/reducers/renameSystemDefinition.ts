import { EditorStateReducer } from "../types/EditorStateReducer";
import { get, set } from "../../nominal";
import {
  SystemDefinition,
  SystemDefinitionId,
} from "../../ecs-serializable/types/SystemDefinition";

export const renameSystemDefinition: EditorStateReducer<{
  systemId: SystemDefinitionId;
  name: SystemDefinition["name"];
}> = ({ ecs: { systems } }, { payload: { systemId, name } }) => {
  const system = get(systems, systemId);
  if (!system) {
    throw new Error("System not found");
  }
  set(systems, systemId, { ...system, name });
};
