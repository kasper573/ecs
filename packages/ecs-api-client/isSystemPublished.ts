import { SystemDefinitionId } from "../ecs-serializable/src/definition/SystemDefinition";

export async function isSystemPublished(id: SystemDefinitionId) {
  try {
    const response = await fetch(
      `${process.env.ECS_API_URL}/published/${encodeURIComponent(id)}`
    );
    const result = await response.text();
    return result === "1";
  } catch {}
  return false;
}
