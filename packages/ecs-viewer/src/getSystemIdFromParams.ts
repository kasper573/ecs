import { SystemDefinitionId } from "../../ecs-serializable/src/definition/SystemDefinition";

export function getSystemIdFromParams() {
  return new URL(window.location.href).searchParams.get("id") as
    | SystemDefinitionId
    | undefined;
}
