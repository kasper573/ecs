import { SystemDefinitionId } from "../ecs-serializable/src/definition/SystemDefinition";
import { SerializedECSDefinition } from "../ecs-serializable/src/types/SerializedECSDefinition";
import { ecsApi } from "./ecsApi";

export const getSystem = (id: SystemDefinitionId) =>
  ecsApi(
    `/system/${encodeURIComponent(id)}`,
    {},
    (response) => response.json() as Promise<GetSystemSuccess>
  );

type GetSystemSuccess = { ecs: SerializedECSDefinition };
