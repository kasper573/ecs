import { SystemDefinitionId } from "../ecs-serializable/src/definition/SystemDefinition";

export async function unpublishSystem(
  systemId: SystemDefinitionId,
  accessToken: string
): Promise<UnpublishSystemResult> {
  try {
    const response = await fetch(
      `${process.env.ECS_API_URL}/unpublish/${encodeURIComponent(systemId)}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      return { type: "success" };
    }
    const message = await response.text();
    return { type: "error", message: message ?? response.statusText };
  } catch (e) {
    return {
      type: "error",
      message: "Oops, something went wrong",
    };
  }
}

export type UnpublishSystemResult = UnpublishSuccess | UnpublishError;

export type UnpublishSuccess = { type: "success" };

export type UnpublishError = { type: "error"; message: string };
