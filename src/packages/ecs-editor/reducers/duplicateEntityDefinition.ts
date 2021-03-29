import { get, set } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import {
  EntityDefinition,
  EntityDefinitionId,
} from "../../ecs-serializable/types/EntityDefinition";
import { uuid } from "../../ecs-common/uuid";
import { duplicateName } from "../functions/duplicateName";

export const duplicateEntityDefinition = createEditorStateReducer<EntityDefinitionId>(
  (state, { payload: id }) => {
    const def = get(state.ecs.entityDefinitions, id);
    if (!def) {
      throw new Error("Could not find entity definition to duplicate");
    }

    const duplicate: EntityDefinition = {
      ...def,
      id: uuid(),
      nodeId: uuid(),
      name: duplicateName(def.name),
    };
    set(state.ecs.entityDefinitions, duplicate.id, duplicate);
  }
);