import { SystemDefinition } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createSystemDefinition = createEditorStateReducer<SystemDefinition>(
  ({ ecs: { systems } }, { payload: system }) => {
    systems[system.id] = system;
  }
);
