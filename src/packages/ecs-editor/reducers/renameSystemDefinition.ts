import { get, set } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

export const renameSystemDefinition = createEditorStateReducer<{
  systemId: SystemDefinitionId;
  name: string;
}>(({ ecs: { systems } }, { payload: { systemId, name } }) => {
  const system = get(systems, systemId);
  if (!system) {
    throw new Error("System not found");
  }
  set(systems, systemId, { ...system, name });
});
