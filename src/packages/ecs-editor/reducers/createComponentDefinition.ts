import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";

export const createComponentDefinition = createEditorStateReducer<ComponentDefinition>(
  ({ ecs: { componentDefinitions } }, { payload: def }) => {
    componentDefinitions[def.id] = def;
  }
);
