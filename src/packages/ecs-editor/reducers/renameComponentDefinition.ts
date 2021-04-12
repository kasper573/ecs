import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { ComponentDefinitionId } from "../../ecs-serializable/definition/ComponentDefinition";

export const renameComponentDefinition = createEditorStateReducer<{
  id: ComponentDefinitionId;
  name: string;
}>(({ ecs: { componentDefinitions } }, { payload: { id, name } }) => {
  const def = componentDefinitions[id];
  if (!def) {
    throw new Error("Could not find component definition");
  }
  componentDefinitions[id] = { ...def, name };
});
