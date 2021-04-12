import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { EntityDefinitionId } from "../../../ecs-serializable/src/definition/EntityDefinition";

export const renameEntityDefinition = createEditorStateReducer<{
  id: EntityDefinitionId;
  name: string;
}>(({ ecs: { entityDefinitions } }, { payload: { id, name } }) => {
  const def = entityDefinitions[id];
  if (!def) {
    throw new Error("Could not find entity definition");
  }
  entityDefinitions[id] = { ...def, name };
});
