import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

export const renameSystemDefinition = createEditorStateReducer<{
  systemId: SystemDefinitionId;
  name: string;
}>(({ ecs: { systems } }, { payload: { systemId, name } }) => {
  const system = systems[systemId];
  if (!system) {
    throw new Error("System not found");
  }
  systems[systemId] = { ...system, name };
});
