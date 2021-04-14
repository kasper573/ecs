import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

export function getPublishedSystemLink(systemId: SystemDefinitionId) {
  return `${process.env.ECS_VIEWER_URL}/?id=${systemId}`;
}
