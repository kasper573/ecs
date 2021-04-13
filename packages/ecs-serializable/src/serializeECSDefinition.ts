import { SerializedECSDefinition } from "./types/SerializedECSDefinition";
import { ECSDefinition } from "./definition/ECSDefinition";

export function serializeECSDefinition(
  ecs: ECSDefinition,
  space?: string | number
) {
  return JSON.stringify(ecs, null, space) as SerializedECSDefinition;
}
