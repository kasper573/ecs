import { SerializedECSDefinition } from "../ecs-serializable/src/types/SerializedECSDefinition";
import { ecsApi } from "./ecsApi";

export const publishSystem = (ecs: SerializedECSDefinition, token: string) =>
  ecsApi("/publish", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ecs }),
  });
