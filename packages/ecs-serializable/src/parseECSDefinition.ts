import { ECSDefinition } from "./definition/ECSDefinition";
import { SerializedECSDefinition } from "./types/SerializedECSDefinition";

export function parseECSDefinition(
  str: SerializedECSDefinition
): ECSDefinition | undefined {
  // TODO validate and return undefined for failed parses
  try {
    return JSON.parse(str);
  } catch {}
}
