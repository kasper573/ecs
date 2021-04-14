import { SerializedECSDefinition } from "../../../ecs-serializable/src/types/SerializedECSDefinition";

export async function publishSystem(
  ecs: SerializedECSDefinition
): Promise<PublishSystemResult> {
  try {
    const response = await fetch(`${process.env.ECS_API_URL}/publish`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ecs }),
    });
    if (response.status === 200) {
      return { type: "success" };
    }
    const message = await response.text();
    return { type: "error", message: message ?? response.statusText };
  } catch (e) {
    return {
      type: "error",
      message:
        process.env.NODE_ENV !== "production"
          ? "" + e
          : "Oops, something went wrong",
    };
  }
}

export type PublishSystemResult =
  | { type: "success" }
  | { type: "error"; message: string };
