import { SystemDefinitionId } from "./SystemDefinition";

export type SceneDefinitionId = Nominal<string, "SceneDefinitionId">;

export type SceneDefinition = {
  /**
   * uuid
   */
  id: SceneDefinitionId;
  /**
   * Used for presentation
   */
  name: string;
  /**
   * The id of the system this scene belongs to
   */
  systemId: SystemDefinitionId;
};
