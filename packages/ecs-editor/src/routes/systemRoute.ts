import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { createRoute } from "../functions/createRoute";

export const systemRoute = createRoute(
  { path: "/system/:id" },
  ({ id }: { id: SystemDefinitionId }) => `/system/${id}`
);
