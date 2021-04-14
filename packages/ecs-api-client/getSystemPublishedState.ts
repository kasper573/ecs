import { SystemDefinitionId } from "../ecs-serializable/src/definition/SystemDefinition";
import { getSystem } from "./getSystem";

export async function getSystemPublishedState(id: SystemDefinitionId) {
  const system = await getSystem(id);
  return !!system;
}
