import { SystemDefinition } from "../../ecs-serializable/definition/SystemDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createSystemDefinition = createEditorStateReducer<SystemDefinition>(
  ({ ecs: { systems } }, { payload: system }) => {
    systems[system.id] = system;
  }
);
