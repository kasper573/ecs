import { EntityInitializer } from "./EntityInitializer";

export type SceneDefinitionId = Nominal<string, "SceneDefinitionId">;

export type SceneDefinition = {
  id: SceneDefinitionId;
  name: string;
  entities: EntityInitializer[];
};
