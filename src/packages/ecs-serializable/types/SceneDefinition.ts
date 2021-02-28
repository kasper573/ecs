import { EntityInitializer } from "./EntityInitializer";

export type SceneDefinition = {
  name: string;
  entities: EntityInitializer[];
};
