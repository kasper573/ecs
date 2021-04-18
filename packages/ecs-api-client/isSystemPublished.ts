import { SystemDefinitionId } from "../ecs-serializable/src/definition/SystemDefinition";
import { ecsApi } from "./ecsApi";

export const isSystemPublished = (id: SystemDefinitionId) =>
  ecsApi(`/published/${encodeURIComponent(id)}`, {}, async (response) => ({
    published: "1" === (await response.text()),
  }));
