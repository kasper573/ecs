import { SystemDefinitionId } from "../../ecs-serializable/src/definition/SystemDefinition";
import { SerializedECSDefinition } from "../../ecs-serializable/src/types/SerializedECSDefinition";

export async function fetchECSDefinition(id: SystemDefinitionId) {
  try {
    const response = await fetch(
      `${process.env.ECS_API_URL}/system/${encodeURIComponent(id)}`
    );
    const result: GetSystemResult = await response.json();
    return result?.ecs;
  } catch {}
}

type GetSystemResult = { ecs: SerializedECSDefinition } | undefined;
