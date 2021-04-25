import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { ComponentDefinitionId } from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { ECSScript } from "../../../ecs-serializable/src/definition/ECSScript";

export const setComponentDefinitionScript = createEditorStateReducer<{
  id: ComponentDefinitionId;
  script: ECSScript;
}>(({ ecs: { componentDefinitions } }, { payload: { id, script } }) => {
  const def = componentDefinitions[id];
  if (!def) {
    throw new Error("Could not find component definition");
  }
  def.script = script;
});
