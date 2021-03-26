import { set } from "../../nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";

export const createEntityDefinition = createEditorStateReducer<EntityDefinition>(
  ({ ecs: { entityDefinitions } }, { payload: def }) => {
    set(entityDefinitions, def.id, def);
  }
);
