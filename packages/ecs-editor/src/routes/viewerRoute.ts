import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { createRoute } from "../functions/createRoute";

export const viewerRoute = createRoute(
  { path: "/view/:id" },
  ({ id }: { id: SystemDefinitionId }) => `/view/${id}`
);
