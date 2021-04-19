import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { serializeECSDefinition } from "../../../ecs-serializable/src/serializeECSDefinition";
import { parseECSDefinition } from "../../../ecs-serializable/src/parseECSDefinition";
import { SerializedECSDefinition } from "../../../ecs-serializable/src/types/SerializedECSDefinition";

export function saveECSDefinitionToLocalStorage(ecs: ECSDefinition) {
  localStorage.setItem("ecs", serializeECSDefinition(ecs));
}

export function loadECSDefinitionFromLocalStorage() {
  const ecsString = localStorage.getItem("ecs") as
    | SerializedECSDefinition
    | undefined;
  if (!ecsString) {
    return;
  }
  const result = parseECSDefinition(ecsString);
  return result.type === "success" ? result.ecs : undefined;
}
