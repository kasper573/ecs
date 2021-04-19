import { ECSDefinition, ecsDefinitionSchema } from "./definition/ECSDefinition";
import { SerializedECSDefinition } from "./types/SerializedECSDefinition";

export function parseECSDefinition(
  str: SerializedECSDefinition
): ParseECSDefinitionResult {
  try {
    const jsonObject = JSON.parse(str);
    const ecs = ecsDefinitionSchema.parse(jsonObject);
    return { type: "success", ecs };
  } catch (e) {
    return { type: "error", message: `${e}` };
  }
}

type ParseECSDefinitionResult =
  | { type: "success"; ecs: ECSDefinition }
  | { type: "error"; message: string };
