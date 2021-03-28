import { get, set } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EntityDefinitionId } from "../../ecs-serializable/types/EntityDefinition";

export const renameEntityDefinition = createEditorStateReducer<{
  id: EntityDefinitionId;
  name: string;
}>(({ ecs: { entityDefinitions } }, { payload: { id, name } }) => {
  const def = get(entityDefinitions, id);
  if (!def) {
    throw new Error("Could not find entity definition");
  }
  set(entityDefinitions, id, { ...def, name });
});
