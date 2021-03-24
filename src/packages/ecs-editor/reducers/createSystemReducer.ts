import { EditorStateReducer } from "../types/EditorStateReducer";
import { set } from "../../nominal";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";

export const createSystemReducer: EditorStateReducer<SystemDefinition> = (
  { ecs: { systems } },
  { payload: system }
) => {
  set(systems, system.id, system);
};
