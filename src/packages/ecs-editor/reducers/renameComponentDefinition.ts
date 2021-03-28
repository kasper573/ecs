import { get, set } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { ComponentDefinitionId } from "../../ecs-serializable/types/ComponentDefinition";

export const renameComponentDefinition = createEditorStateReducer<{
  id: ComponentDefinitionId;
  name: string;
}>(({ ecs: { componentDefinitions } }, { payload: { id, name } }) => {
  const def = get(componentDefinitions, id);
  if (!def) {
    throw new Error("Could not find component definition");
  }
  set(componentDefinitions, id, { ...def, name });
});
