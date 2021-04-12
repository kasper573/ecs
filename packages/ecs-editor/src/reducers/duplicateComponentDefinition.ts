import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { uuid } from "../../../ecs-common/src/uuid";
import { duplicateName } from "../functions/duplicateName";

export const duplicateComponentDefinition = createEditorStateReducer<ComponentDefinitionId>(
  (state, { payload: id }) => {
    const def = state.ecs.componentDefinitions[id];
    if (!def) {
      throw new Error("Could not find component definition to duplicate");
    }

    const duplicate: ComponentDefinition = {
      ...def,
      id: uuid(),
      nodeId: uuid(),
      name: duplicateName(def.name),
    };
    state.ecs.componentDefinitions[duplicate.id] = duplicate;
  }
);
