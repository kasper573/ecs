import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createSystemDefinition = createEditorStateReducer<SystemDefinition>(
  ({ ecs: { systems, scenes } }, { payload: system }) => {
    systems[system.id] = system;
  }
);
