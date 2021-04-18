import { SystemDefinitionId } from "../ecs-serializable/src/definition/SystemDefinition";
import { ecsApi } from "./ecsApi";

export const unpublishSystem = (systemId: SystemDefinitionId, token: string) =>
  ecsApi(`/unpublish/${encodeURIComponent(systemId)}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
