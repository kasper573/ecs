import { SystemDefinitionId } from "./SystemDefinition";

export type SceneDefinitionId = NominalString<"SceneDefinitionId">;

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
